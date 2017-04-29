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
You can then press "F12" to open the developer console (on chrome) and see your
## Back End Information

## Building the Docs



## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
