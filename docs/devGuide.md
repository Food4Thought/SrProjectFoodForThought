# FoodForThought App Continuation Guide

This is a development guide for the FoodForThought volunteer organization app. It will walk you through basic setup of the development environment, basic knowledge about the frameworks and tools we used, and the solved/unsolved problems we've run into.

## Getting Started

### Prerequisites

You'll need to install node.js and ionic to get started with our app. Node.js can be downloaded for your operating system [here.][beae58db]

  [beae58db]: https://nodejs.org/en/ "Node.js"

  Ionic can then be installed by running the following in your terminal:

```
npm install -g cordova ionic
```

**Note: This app was created using ionic v1. While you don't have to do anything during install to specify that you;re using v1, you will need to make sure you reference the v1 docs, and not v2.**

In order to build the app for Android and iOS, you will need to follow the [Android][33764a3e] and [iOS][90d500ab] platform guides respectively.

  [33764a3e]: https://cordova.apache.org/docs/en/6.x/guide/platforms/android/ "Android Platform Guide"
  [90d500ab]: https://cordova.apache.org/docs/en/6.x/guide/platforms/ios/ "iOS Platform Guide"

### Installing

Clone the FoodForThought app git repository.

[//]: # (Need to change the github url for when we give it to Danielle)

```
git clone https://github.com/DJW0519/SrProjectFoodForThought
```

Run the app in your web browser to verify that it works. Make sure you are in the "FoodForThought" folder.
```
cd SrProjectFoodForThought/FoodForThought
ionic serve
```

You should see the following screen on startup.

[//]: # (Insert picture of welcome screen here)

To build and emulate for iOS, run

```
ionic build ios
ionic emulate ios
```

To build and emulate for Android, run

```
ionic build android
ionic emulate android
```

Make sure you've followed the guides for each platform before attempting to build and emulate!

## Front End Information

### Ionic file structure

The different screens of the app are each their own html file located in the templates folder.
```
SrProjectFoodForThought/FoodForThought/www/templates
```
Each screen also has a controller associated with it, which controls how it behaves. All the controllers are defined in controllers.js

```
SrProjectFoodForThought/FoodForThought/www/js/controllers.js
```

These two are linked in the stateprovider, which is located in app.js

```
SrProjectFoodForThought/FoodForThought/www/js/app.js
```
When making a new screen, you'll want to create an html template for it, add a controller for it in controllers.js, and then define both of them in app.js

### Ionic Plugins

We installed a few plugins on top of ionic. There is no need to reinstall them, but it may be helpful to reference their docs.

#### Ionic Filter Bar

This is used in the admin checkin screen to search for volunteers from a list. You can find the docs [here.][e1daa1ff]

  [e1daa1ff]: https://github.com/djett41/ionic-filter-bar "Ionic Filter Bar Github"

#### ngStorage

This plugin is used to handle local storage. Specifically, we used it to store user credentials and which user is currently logged in. You can find the docs [here.][fdfb298b]

  [fdfb298b]: https://github.com/gsklee/ngStorage "ngStorage Github"

Users can be found in $scope.$storage.users. The email of the current user is found at $scope.$storage.currentUser. You can access a particular user by using their email as the key. So, the currently logged in user's info can be accessed through the following:

```
$scope.$storage.users[$scope.$storage.currentUser]
```

### Partially Completed Features

#### Geolocation

We've started working on checking people when they arrive at a volunteer location. We've implemented a basic example that returns your current lattitude and longitude using the Cordova Geolocation Plugin. You can play with it in the 'Geolocation' git branch.

```
git checkout Geolocation
```

You then need to manually navigate to the geolocation test page in your browser.
```
localhost:8100/#/geo
```
You can then press "F12" to open the developer console (on chrome), and you should see your current latitude.

The controller for the geolocation test page is named 'GeoCtrl'

This feature needs to wait until the time of a volunteer's shift, then start checking if they are within a certain radius of a volunteer location (which would be set by an admin under 'manage locations'.)
If the volunteer entered that radius within a short time after the shift started, they would be checked in for that shift.

#### Settings Screen

##### Logout

The settings screen currently has a "Logout" button. This needs to set $scope.$storage.currentUser to null and redirect to he welcome screen.

##### Automatic Check In

Once geolocation is implemented, this toggle switch needs to be combined with "location services" and should prompt the user to enable gps for the app, and enable automatic check in.

## Features Needing Back End Support
There are some features that are entirely implemented on the front end, but need implementation on the back end in order to function. These are mostly admin features.

### Creating Notifications

Notifications can be created in the admin section of the app, but they are only stored locally; they are not distributed to volunteers. For this to function, there needs to be a place in Salesforce to store the notifications, and a way to retrieve the notifications from Salesforce on the app.

### Creating Locations/Shifts

New locations and volunteer times can be created in the admin section of the app, but doing so does not create new shifts in Salesforce. Locations are okay to be stored locally, (though it isn't necessarily ideal) but volunteer times need to be stored in Salesforce, and retrieved to populate the shifts on the home screen.

### Checking in Volunteers as Admin

Given a list of volunteers, an admin can move them from a "Unchecked" list to a "Checked in" list locally in the app. This feature needs to be able to pull a list of volunteers for a given shift from Salesforce, and needs to be able to check in each volunteer through Salesforce.

## Back End Information

## Building the Docs
