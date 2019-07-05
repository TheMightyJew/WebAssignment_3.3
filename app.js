let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            // this is a template
            templateUrl: 'pages/explore/explore.html',
            controller : 'exploreController as exploreCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller : 'httpController as httpCtrl'
        })
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller : 'loginController as loginCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as registerCtrl'
        })
        .when('/recoverPassword/:username', {
            templateUrl: 'pages/recoverPassword/recoverPassword.html',
            controller : 'recoverPasswordController as recoverPasswordCtrl'
        })
        .when('/poiDetails/:poiID', {
            templateUrl: 'pages/poiDetails/poiDetails.html',
            controller : 'poiDetailsController as poiDetailsCtrl'
        })
        .when('/review/:poiID', {
            templateUrl: 'pages/review/review.html',
            controller : 'reviewController as reviewCtrl'
        })
        .when('/homeRegistered', {
            templateUrl: 'pages/homeRegistered/homeRegistered.html',
            controller : 'homeRegisteredController as homeRegisteredCtrl'
        })
        .when('/favorites', {
            templateUrl: 'pages/favorites/favorites.html',
            controller : 'favoritesController as favoritesCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});