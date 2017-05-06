/*
    Copyright (c) 2016, Salesforce.org
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of Salesforce.org nor the names of
      its contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.
 
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
    LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS 
    FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE 
    COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
    BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER 
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT 
    LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN 
    ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
    POSSIBILITY OF SUCH DAMAGE.
*/

global virtual with sharing class myVOL_CTRL_VolunteersReportHours {
  
    private GW_Volunteers.VOL_SharedCode volSharedCode; 
     
    // constructor
    global myVOL_CTRL_VolunteersReportHours() {
        volSharedCode = new GW_Volunteers.VOL_SharedCode();

        // initial values for potential parameters
        strLanguage = 'en-us'; 
        strDateFormat = 'EEEE M/d/yyyy';
        strTimeFormat = 'h:mm tt';

        // handle optional page parameters (must use string, not ID, to handle null)
        map<string, string> params = ApexPages.currentPage().getParameters();
        string p = params.get('Language');
        if (p != null && p != '') strLanguage = p;
        p = params.get('DateFormat');
        if (p != null && p != '') strDateFormat = p;
        p = params.get('TimeFormat');
        if (p != null && p != '') strTimeFormat = p;

        // we now get the fields from the fieldset
        listStrFields = GW_Volunteers.VOL_SharedCode.listStrFieldsFromContactFieldSet(Schema.SObjectType.Contact.fieldSets.GW_Volunteers__VolunteersReportHoursFS);
        
        // output error page messages for any field that doesn't have visibility correctly set.
        GW_Volunteers.VOL_SharedCode.testObjectFieldVisibility('Contact', listStrFields);

        // we can derive whether we are within the Personal Site or not, so no need for parameter.
        fPersonalSite = ApexPages.currentPage().getUrl().contains('PersonalSite');              
    } 
            
    // holds the contact fields on the page            
    global Contact contact { 
        get {
            if (contact == null) {
                contact = new Contact();
                contact.put('firstName', apexpages.currentpage().getparameters().get('fname'));
                contact.put('lastName',apexpages.currentpage().getparameters().get('lname'));
                contact.put('mobilePhone',apexpages.currentpage().getparameters().get('phone'));
                contact.put('email',apexpages.currentpage().getparameters().get('email'));

                // when used within the Personal Site, we should use the appropriate Contact
                contactIdPersonalSite = null;
                Cookie cId = ApexPages.currentPage().getCookies().get('contactIdPersonalSite');
                if (cId != null) contactIdPersonalSite = cId.getValue();
               /* if (contactIdPersonalSite != null && contactIdPersonalSite != '') {
                    GW_Volunteers.VOL_SharedCodeAPI25.LoadAndCopyObject(contactIdPersonalSite, contact, listStrFields);                   
                }*/ 
            }
            return contact;
        }       
        set; 
    }
    
    private string contactIdPersonalSite { get; set; }
    
    // holds the dates and hours fields on the page
    global GW_Volunteers__Volunteer_Hours__c vhours {
        get {
            if (vhours == null) vhours = new GW_Volunteers__Volunteer_Hours__c();
            return vhours;
        }
        set;
    }

    // returns the correct URL for the CSS override file
    global string strURLtoCSSFile { 
        get { 
            if (fPersonalSite) return null; // just use whatever CSS the Site Template includes.

            if (strURLtoCSSFile == null) {
                list<Document> listDocs = [SELECT Name, Id From Document WHERE Name = 'VolunteersReportHoursCSS.css' LIMIT 1 ];
                if (listDocs.size() > 0) {
                    Document doc = listDocs[0];
                    string imageid = doc.id;
                    imageid = imageid.substring(0,15);
                    strURLToCSSFile = '/servlet/servlet.FileDownload?file=' + imageid;
                }
            }
            return strURLtoCSSFile;
        }  
        
        set;
    }
    
    // global properties
    global string strLanguage { get; set; }
    global string strDateFormat { get; set; }
    global string strTimeFormat { get; set; }
    global list<string> listStrFields { get; set; } 
    global boolean fPersonalSite { get; set; }

    // status string for reporting the results of saving.
    global String strSaveResult { get; set; }    
    
    // holds the currently select Job in the Job dropdown
    global ID volunteerJobId { get; set; }
    
    // returns true when jobs are available for contact
    // we check the size against 1 (not 0) becasue of the first empty select option
    global Boolean hasVolunteerJobs {
        get { 
            return 1 < listSOVolunteerJobs.size();
        }
        set;
    }
    public static list<SelectOption> listSOVolunteerShiftsOfVolunteerJobIdFormat(ID volunteerJobId, Date dtStart, Date dtEnd, 
        boolean fIncludeShiftName, boolean fIncludeNumberNeeded, string strDateFormat, string strTimeFormat) {
     
        list<SelectOption> listSO = new list<SelectOption>();
        listSO.add(new SelectOption('', ''));
        
        // ensure valid date ranges
        if (dtStart == null)
            dtStart = system.today();
        if (dtEnd == null)
            dtEnd = system.today().addMonths(12);
        dtEnd = dtEnd.addDays(1);
        
        // get our shifts in a Job query, so we can use our common date/time formatting routine.
        list<GW_Volunteers__Volunteer_Job__c> listVolunteerJobs = [select Id, GW_Volunteers__Campaign__r.IsActive, GW_Volunteers__Campaign__r.GW_Volunteers__Volunteer_Website_Time_Zone__c,
            GW_Volunteers__Volunteer_Website_Time_Zone__c,
            (Select Id, Name, GW_Volunteers__Start_Date_Time__c, GW_Volunteers__Duration__c, GW_Volunteers__Number_of_Volunteers_Still_Needed__c,
                GW_Volunteers__Description__c, GW_Volunteers__System_Note__c From GW_Volunteers__Volunteer_Job_Slots__r 
                where GW_Volunteers__Start_Date_Time__c >= :dtStart and GW_Volunteers__Start_Date_Time__c < :dtEnd
                order by GW_Volunteers__Start_Date_Time__c LIMIT 999) 
            from GW_Volunteers__Volunteer_Job__c where Id = :volunteerJobId];
                
        // bail out if no jobs found
        if (listVolunteerJobs.size() == 0)
            return listSO;
        
        // whether to use our datetime formatting, or salesforce default for the current user
        boolean useDateTimeFixup = (strDateFormat != null && strTimeFormat != null);        
        
        // put correct date/time format with appropriate timezone in system note field (in memory only)
        if (useDateTimeFixup)
            dateTimeFixup(listVolunteerJobs, strDateFormat, strTimeFormat);
        
        for (GW_Volunteers__Volunteer_Shift__c vs : listVolunteerJobs[0].GW_Volunteers__Volunteer_Job_Slots__r) {
            SelectOption so = new SelectOption(vs.id, 
                (useDateTimeFixup ? vs.GW_Volunteers__System_Note__c : vs.GW_Volunteers__Start_Date_Time__c.format()) + 
                (fIncludeShiftName ? '&nbsp;&nbsp;&nbsp;&nbsp;(' + vs.name + ')' : '' ) +
                (fIncludeNumberNeeded ? '&nbsp;&nbsp;' + 
                    (vs.GW_Volunteers__Number_of_Volunteers_Still_Needed__c > 0 ? 
                        system.label.GW_Volunteers.labelCalendarStillNeeded + vs.GW_Volunteers__Number_of_Volunteers_Still_Needed__c : system.label.GW_Volunteers.labelCalendarShiftFull) +
                    ' ' : '' ));
            so.setEscapeItem(false); 
            listSO.add(so);
        }       
        return listSO;
}



public static void dateTimeFixup(list<GW_Volunteers__Volunteer_Job__c> listJob, string strDateFormat, string strTimeFormat) {
        
        // get default time zone for site guest user
        User u = [Select TimeZoneSidKey From User where id =: Userinfo.getUserId()];
        
        // javascript formatting used 'tt' for am/pm, whereas apex formatting uses 'a'.
        string strFormat = strDateFormat + ' ' + strTimeFormat.replace('tt','a');
        string strFormatEndTime = strTimeFormat.replace('tt','a');
        
        for (GW_Volunteers__Volunteer_Job__c job : listJob) {
            string strTimeZone = job.GW_Volunteers__Volunteer_Website_Time_Zone__c;
            if (strTimeZone == null) strTimeZone = job.GW_Volunteers__Campaign__r.GW_Volunteers__Volunteer_Website_Time_Zone__c;
            if (strTimeZone == null) strTimeZone = u.TimeZoneSidKey;

            for (GW_Volunteers__Volunteer_Shift__c shift : job.GW_Volunteers__Volunteer_Job_Slots__r) {
                
                DateTime dtEnd = shift.GW_Volunteers__Start_Date_Time__c.addMinutes(integer.valueOf(shift.GW_Volunteers__Duration__c * 60));
                string strStart = shift.GW_Volunteers__Start_Date_Time__c.format(strFormat, strTimeZone);
                
                // see if start and end are on the same day
                if (shift.GW_Volunteers__Start_Date_Time__c.format('d', strTimeZone) == dtEnd.format('d', strTimeZone)) {
                    shift.GW_Volunteers__System_Note__c =  strStart + ' - ' + dtEnd.format(strFormatEndTime, strTimeZone); 
                } else {
                    shift.GW_Volunteers__System_Note__c =  strStart + ' - ' + dtEnd.format(strFormat, strTimeZone);                        
                }               
            }
        }
    }
    
    // return the GMT datetime for a datetime in the specified timezone
    public static DateTime dtGmtFromDtTimeZone(DateTime dt, TimeZone tz) {
        integer offset = tz.getOffset(dt);
        return dt.addSeconds(-offset / 1000);
}




    
    // the list of Volunteer Jobs to put in the dropdown
    global list<SelectOption> listSOVolunteerJobs {
        get {
            if (listSOVolunteerJobs == null) {              
                listSOVolunteerJobs = new list<SelectOption>();
                listSOVolunteerJobs.add(new SelectOption('', ''));
                
                Boolean filterByContact = GW_Volunteers.VOL_SharedCode.VolunteersSettings.GW_Volunteers__Personal_Site_Report_Hours_Filtered__c;
                List<GW_Volunteers__Volunteer_Job__c> volunteerJobs = new List<GW_Volunteers__Volunteer_Job__c>();
                if (filterByContact && contactIdPersonalSite != null) {
                    volunteerJobs =  [select Name, Id, 
                                            (select Id, GW_Volunteers__Contact__c from GW_Volunteers__Volunteer_Hours__r 
                                            where GW_Volunteers__Contact__c = :contactIdPersonalSite LIMIT 1)
                                        from GW_Volunteers__Volunteer_Job__c
                                        where GW_Volunteers__Campaign__r.IsActive = true and GW_Volunteers__Inactive__c = false 
                                        order by name limit 999];
                                        
                } else {
                    volunteerJobs = [select Name, Id
                                    from GW_Volunteers__Volunteer_Job__c
                                    where GW_Volunteers__Campaign__r.IsActive = true and GW_Volunteers__Inactive__c = false
                                    order by name limit 999];
                }
                
                for (GW_Volunteers__Volunteer_Job__c vj : volunteerJobs) {
                    if(filterByContact && contactIdPersonalSite != null) {
                        for (GW_Volunteers__Volunteer_Hours__c volHour : vj.GW_Volunteers__Volunteer_Hours__r) {
                            listSOVolunteerJobs.add(new SelectOption(vj.id, vj.name));
                        }               
                    } else {
                        listSOVolunteerJobs.add(new SelectOption(vj.id, vj.name));
                    }
                }
            }
            return listSOVolunteerJobs;
        }
        
        set;
    }

    // the user has changed the Volunteer Job dropdown
    global virtual PageReference ChangeVolunteerJob() {
        // clear out all state that is specific to the Job
        strSaveResult = null;
        listSOVolunteerShifts = null;
        volunteerShiftId = null;
        ChangeVolunteerShift();
        return null;
    }

    // holds the currently select Job Shift in the Job Shift dropdown
    global ID volunteerShiftId { get; set; }
    
    // the list of Volunteer Shifts to put in the dropdown
    global list<SelectOption> listSOVolunteerShifts {
        get {
            if (listSOVolunteerShifts == null && volunteerJobId != null) {
                listSOVolunteerShifts = listSOVolunteerShiftsOfVolunteerJobIdFormat(volunteerJobId, 
                    system.today().addDays(-6), system.today(), false, false, strDateFormat, strTimeFormat);
                    
            for( SelectOption testvar: listSOVolunteerShifts)
                {
                // IDs cannot be assigned empty value so must encase this in try/catch block
                    try{
                    volunteerShiftId=Id.valueOf(testvar.getValue());
                    }catch(exception e){
                    }
                }
            
            }
            return listSOVolunteerShifts;
        }
        
        set;
    }

    // specifies whether the currently selected Job has any Shifts.
    global boolean hasShifts { 
        get {
            return listSOVOlunteerShifts != null && listSOVolunteerShifts.size() > 1;
        }
        set; 
    }

    // the user has changed the Volunteer Shift dropdown
    global virtual PageReference ChangeVolunteerShift() {
        // clear out info
        strSaveResult = null;       
        vhours.GW_Volunteers__Start_Date__c = date.today();
        vhours.GW_Volunteers__End_Date__c = date.today();
        vhours.GW_Volunteers__Hours_Worked__c = 3;
        vhours.GW_Volunteers__Volunteer_Job__c = volunteerJobId;
        vhours.GW_Volunteers__Volunteer_Shift__c = volunteerShiftId;
        
        // set date and hours from shift
        if (volunteerShiftId != null) {
            GW_Volunteers__Volunteer_Shift__c shift = [select GW_Volunteers__Start_Date_Time__c, GW_Volunteers__Duration__c from GW_Volunteers__Volunteer_Shift__c
                where Id = :volunteerShiftId];
            vhours.GW_Volunteers__Start_Date__c = shift.GW_Volunteers__Start_Date_Time__c.Date();
            vhours.GW_Volunteers__End_Date__c = vhours.GW_Volunteers__Start_Date__c;
            vhours.GW_Volunteers__Hours_Worked__c = shift.GW_Volunteers__Duration__c;
        }
        return null;        
    }

    private class MyException extends Exception {}


    // action method for saving the the volunteer's hours.    
    global virtual PageReference Save() {  
        try { 
            // because we need to use actionSupport immediate=false to support the combo's,
            // we couldn't actually use visualforce's required=true property on fields.
            // so we must manually enforce the fields we want required ourselves.
            boolean hasErrors = false;

            // first deal with fields on the contact.
            for (Schema.FieldSetMember f : SObjectType.Contact.FieldSets.GW_Volunteers__VolunteersReportHoursFS.getFields()) {
                if (contact.get(f.getFieldPath()) == null && (f.getDBRequired() || f.getRequired())) {
                    ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, 
                        String.Format(system.label.gw_volunteers.labelVolunteerReportHoursErrorRequiredField, new string[] { f.getLabel() })));   
                    hasErrors = true;   
                }           
            }   
                                
            if (volunteerJobId == null) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, 
                    String.Format(system.label.GW_Volunteers.labelVolunteerReportHoursErrorRequiredField, new string[] { Schema.sObjectType.GW_Volunteers__Volunteer_Hours__c.fields.GW_Volunteers__Volunteer_Job__c.getLabel() })));   
                hasErrors = true;               
            }
            if (vhours.GW_Volunteers__Start_Date__c == null) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, 
                    String.Format(system.label.GW_Volunteers.labelVolunteerReportHoursErrorRequiredField, new string[] { Schema.sObjectType.GW_Volunteers__Volunteer_Hours__c.fields.GW_Volunteers__Start_Date__c.getLabel() })));  
                hasErrors = true;               
            }
            if (vhours.GW_Volunteers__End_Date__c == null) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, 
                    String.Format(system.label.GW_Volunteers.labelVolunteerReportHoursErrorRequiredField, new string[] { Schema.sObjectType.GW_Volunteers__Volunteer_Hours__c.fields.GW_Volunteers__End_Date__c.getLabel() })));    
                hasErrors = true;               
            }
            if (vhours.GW_Volunteers__Hours_Worked__c == null) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, 
                    String.Format(system.label.GW_Volunteers.labelVolunteerReportHoursErrorRequiredField, new string[] { Schema.sObjectType.GW_Volunteers__Volunteer_Hours__c.fields.GW_Volunteers__Hours_Worked__c.getLabel() })));    
                hasErrors = true;               
            }
            
            // check additional fields on the vol hours
            for (Schema.FieldSetMember f : SObjectType.GW_Volunteers__Volunteer_Hours__c.FieldSets.GW_Volunteers__VolunteersReportHoursFS.getFields()) {
                if (vhours.get(f.getFieldPath()) == null && (f.getDBRequired() || f.getRequired())) {
                    ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, 
                        String.Format(system.label.GW_Volunteers.labelVolunteerReportHoursErrorRequiredField, new string[] { f.getLabel() })));   
                    hasErrors = true;   
                }           
            }
            
            // now bail out if any required fields are missing.                     
            if (hasErrors) {
                strSaveResult = null;
                return null;            
            }           
            
            // save or update the contact               
            ID contactId = GW_Volunteers.VOL_SharedCode.CreateOrUpdateContactFS(contactIdPersonalSite, contact, contact.GW_Volunteers__Volunteer_Organization__c, listStrFields, false);
            
            list<GW_Volunteers__Volunteer_Hours__c> listHours = null;

            if (volunteerShiftId != null) {
                // search for an existing Hours record to update, if they specified a Shift
                listHours = [select Id from GW_Volunteers__Volunteer_Hours__c where 
                    GW_Volunteers__Volunteer_Shift__c = :volunteerShiftId and GW_Volunteers__Contact__c = :contactId];
            } else {
                // search for an existing Hours record to update for this job 
                // match non-committed hours, or committed where the start date is the same.
                listHours = [select Id from GW_Volunteers__Volunteer_Hours__c where 
                    GW_Volunteers__Volunteer_Job__c = :volunteerJobId and GW_Volunteers__Contact__c = :contactId and 
                    (GW_Volunteers__Status__c <> 'Completed' or GW_Volunteers__Start_Date__c = :vhours.GW_Volunteers__Start_Date__c) ];              
            }

            // if we found a matching Hours, just update it
            if (listHours != null && listHours.size() > 0) {
                listHours[0].GW_Volunteers__Status__c = 'Completed';
                listHours[0].GW_Volunteers__Start_Date__c = vhours.GW_Volunteers__Start_Date__c;
                listHours[0].GW_Volunteers__End_Date__c = vhours.GW_Volunteers__End_Date__c;
                listHours[0].GW_Volunteers__Hours_Worked__c = vhours.GW_Volunteers__Hours_Worked__c;
            
                // update the additional fields, if any
                for (Schema.FieldSetMember f : SObjectType.GW_Volunteers__Volunteer_Hours__c.FieldSets.GW_Volunteers__VolunteersReportHoursFS.getFields()) {
                    String fieldName = f.getFieldPath();
                    if (vhours.get(fieldName) != null) {
                        listHours[0].put(fieldName, vhours.get(fieldName)); 
                    }   
                }   
                        
                update listHours[0];
            } else {        
                // create new hours if needed
                vhours.GW_Volunteers__Volunteer_Job__c = volunteerJobId;
                vhours.GW_Volunteers__Volunteer_Shift__c = volunteerShiftId;
                vhours.GW_Volunteers__Status__c = 'Completed';
                vhours.GW_Volunteers__Contact__c = contactId;
                vhours.GW_Volunteers__Number_of_Volunteers__c = 1;
                insert vhours;
            }
            
            // clear current job & shift info
            volunteerJobId = null;
            ChangeVolunteerJob();
            vhours = null;
            
            strSaveResult = system.label.GW_Volunteers.labelVolunteerReportHoursThankYou;
        } catch (DMLException ex) {
            //Added check for FIELD_CUSTOM_VALIDATION_EXCEPTION to return user friendly error.
            strSaveResult = ex.getMessage(); 
            if (strSaveResult.contains('FIELD_CUSTOM_VALIDATION_EXCEPTION')) {
                strSaveResult = strSaveResult.substringBetween('FIELD_CUSTOM_VALIDATION_EXCEPTION, ', ': ');
            }
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, strSaveResult));
            strSaveResult = null;
        } catch (exception ex) {
            strSaveResult = null;
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL, ex.getMessage()));                     
        }
        return null;
    }

    // this was a testmethod which can't be compiled in this class under api 31.  
    // but because it was marked global, it could not be completely removed.
    global static void CodeCoverageTests() {}

}