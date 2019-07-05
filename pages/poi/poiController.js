// poi controller
angular.module("myApp")
.controller("poiController", function ($scope) {
    self = this;
    $scope.isLogged = UtilFunctions.isLogged();
    //load all POI to pointsOfInterests
    //load all categories to categories +all option ( should be defult ) 
    $pointsOfInterests = {
        cities: {
            1: { name: "Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg" },
            2: { name: "Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg" },
            3: { name: "London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg" }
        },
        parks: {
            1: { name: "Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg" },
            2: { name: "Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg" },
            3: { name: "London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg" }
        }
    }
    $scope.categoriesSort = function(){
        $scope.pointsOfInterests.sort((a, b) => a.Topic_ID - b.Topic_ID);
        $scope.apply();
    }
    $scope.rankSort = function(){
        $scope.pointsOfInterests.sort((a, b) => b.Rank - a.Rank);
        $scope.apply();
    }
    $scope.show = function(){
        //show only from specific category;
    }
    $scope.search = function(){
        //update pointsOfInterests to be poi with certain name
    }
    $scope.favoriteChange = function (POI_ID) {
        var favorite = document.getElementsByName("isFavorite"+POI_ID)[0].checked;
        if (favorite) {
            UtilFunctions.AddToFavorites(POI_ID);
        }
        else {
            UtilFunctions.RemoveFromFavorites(POI_ID);
        }
    };
});