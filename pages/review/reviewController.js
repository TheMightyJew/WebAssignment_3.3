angular.module("myApp")
.controller("reviewController", function ($scope, $window, $routeParams, ServerHandler, UtilFunctions) {
    $scope.submitReview = function(){
        var rank = $scope.reviewRank;
        var description = $scope.description;
        var token = $window.sessionStorage.getItem('token');
        var POI_ID = $routeParams.poiID;

        ServerHandler.Add_Review(token,POI_ID,rank,description)
        .then(function (response) {
            UtilFunctions.Message('Uploaded the review successfully!');
            $window.location.href = "#!poiDetails/" + $routeParams.poiID;
        }).catch(function (err) {
            console.log(err);
            UtilFunctions.Message('There was a problem uploading the review :(');
        })

    };
});