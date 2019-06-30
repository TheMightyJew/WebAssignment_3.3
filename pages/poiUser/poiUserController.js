// poiUser controller
angular.module("myApp")
.controller("poiUserController", function ($scope) {
    self = this;
    self.poi = {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"};
    $scope.poiTopic1 = self.poi;
    $scope.poiTopic2 = self.poi;
    $scope.lastSaved = self.poi;
    $scope.previousSaved = self.poi;
    $scope.topic1 = "Attractions";
    $scope.topic2 = "Parks";

});