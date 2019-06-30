angular.module("myApp")
.controller("registerController", function ($scope) {
    $scope.register = function(){
        //check if username not taken
        $scope.answer = "Submitted! you entered: " + $scope.loginUsername
    };
});