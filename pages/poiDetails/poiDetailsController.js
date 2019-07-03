// poi controller
angular.module("myApp")
.controller("poiDetailsController", function ($scope,$window,$routeParams) {
    var poiID = $routeParams.poiID;
    self.logged = $window.sessionStorage.getItem("isLogged");
    if(self.logged === null || self.logged === undefined || self.logged === false){
        $scope.isLogged=false;
    }
    else{
        $scope.isLogged=true;
    }
    $scope.save = function(){
        self.favorite = document.getElementsByName("isFavorite")[0].checked;
        if(favorite){
            //add to favorites
        }
        else{
            //remove from favorites
        }
    };
});