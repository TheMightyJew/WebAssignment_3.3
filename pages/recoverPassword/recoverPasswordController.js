angular.module("myApp")
.controller("recoverPasswordController", function ($scope) {
    $scope.recover = function(){
        //check if right credensionals
        $scope.answer = "Submitted! you entered: " + $scope.loginUsername
    };
});