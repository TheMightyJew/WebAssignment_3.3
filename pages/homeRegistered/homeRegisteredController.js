// poiUser controller
angular.module("myApp")
.controller("homeRegisteredController", function ($scope) {
    self = this;
    $scope.isLogged = UtilFunctions.isLogged();
    self.poi = {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"};
    $scope.poiTopic1 = self.poi;
    $scope.poiTopic2 = self.poi;
    $scope.lastSaved = self.poi;
    $scope.previousSaved = self.poi;
    $scope.topic1 = "Attractions";
    $scope.topic2 = "Parks";
    $scope.showPoi = function (poiName) {
        $window.location.href = "#!poiDetails/:" + poiName;
    };
    $scope.favoriteChange = function (i,POI_ID) {
        var favorite = document.getElementsByName("isFavorite")[i].checked;
        if (favorite) {
            UtilFunctions.AddToFavorites(POI_ID);
        }
        else {
            UtilFunctions.RemoveFromFavorites(POI_ID);
        }
    };
});