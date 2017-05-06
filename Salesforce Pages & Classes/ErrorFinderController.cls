<!-- controller used to find errors that salesforce prevents you from seeing-->
public class ErrorFinderController {
    public String failingPageResponse { get; set; }
    
    public void fetchFailingPage() {
       try {
           // Make a call to failing sites page here
           failingPageResponse = Page.myReportHours.getContent().toString();
       } catch (Exception e) {
           failingPageResponse = e.getTypeName() + ' : ' + e.getMessage() ;
       }       
    }   
}