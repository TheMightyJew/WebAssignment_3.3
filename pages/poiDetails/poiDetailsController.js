// poi controller
angular.module("myApp")
    .controller("poiDetailsController", function ($scope, $window, $routeParams, ServerHandler,UtilFunctions) {
        self.poiID = $routeParams.poiID;
        self.logged = $window.sessionStorage.getItem("isLogged");
        if (self.logged === null || self.logged === undefined || self.logged === false) {
            $scope.isLogged = false;
        }
        else {
            $scope.isLogged = true;
        }
        ServerHandler.Get_Details_About_A_Point_Of_Interest(self.poiID)
            .then(function (response) {
                $scope.poi = response;
                ServerHandler.Get_POI_Image(self.poiID)
                    .then(function (response) {
                        $scope.poi.image = response.Image_Path;
                        $scope.$apply();
                    }).catch(function (err) {
                        console.log('There was a problem with the image');
                        console.log(err);
                    })
            }).catch(function (err) {
                console.log('There was a problem');
                console.log(err);
                UtilFunctions.Message("Failed");
            })
        $scope.save = function () {
            self.favorite = document.getElementsByName("isFavorite")[0].checked;
            if (favorite) {
                //add to favorites
            }
            else {
                //remove from favorites
            }
        };

        $scope.addReview = function(){
            $window.location.href = "#!review/" + self.poiID;
        }
    });