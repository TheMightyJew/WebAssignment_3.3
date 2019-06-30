// poi controller
angular.module("myApp")
.controller("homeUnregisteredController", function ($scope, $window, $http, ServerHandler) {
    self = this;
    self.pointsOfInterests = {
        1: {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"},
        2: {name:"Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg"},
        3: {name:"London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg"}
    }
    ServerHandler.Get_Details_About_A_Point_Of_Interest(0);
});