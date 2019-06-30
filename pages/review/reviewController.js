angular.module("myApp")
.controller("reviewController", function ($scope) {
    $scope.submitReview = function(){
        //check if username not taken
        $scope.answer = "Submitted! you entered: " + $scope.loginUsername
    };
});