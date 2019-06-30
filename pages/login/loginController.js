angular.module("myApp")
.controller("loginController", function ($scope) {
    $scope.login = function(){
        //check if right credensionals
        $scope.answer = "Submitted! you entered: " + $scope.loginUsername
    };
});