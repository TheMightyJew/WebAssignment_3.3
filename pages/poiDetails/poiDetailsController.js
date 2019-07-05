// poi controller
angular.module("myApp")
    .controller("poiDetailsController", function ($scope, $window, $routeParams, ServerHandler, UtilFunctions) {
        self.poiID = $routeParams.poiID;
        $scope.isLogged = UtilFunctions.isLogged();
        ServerHandler.Get_Details_About_A_Point_Of_Interest(self.poiID)
            .then(function (response) {
                $scope.poi = response;
                $scope.reviewsExists = $scope.poi.Number_Of_Reviews > 0;
                $scope.oneReview = $scope.poi.Number_Of_Reviews == 1;

                ServerHandler.Get_POI_Image(self.poiID)
                    .then(function (response) {
                        $scope.poi.image = response.Image_Path;
                        $scope.$apply();
                    }).catch(function (err) {
                        console.log('There was a problem with the image');
                        console.log(err);
                    })

                ServerHandler.Add_View_To_POI(self.poiID)
                    .then(function (response) {
                        //console.log(response);
                    }).catch(function (err) {
                        console.log('There was a problem with Add View');
                        console.log(err);
                    })

            }).catch(function (err) {
                console.log('There was a problem');
                console.log(err);
                UtilFunctions.Message("Failed");
            })
        $scope.favoriteChange = function () {
            var favorite = document.getElementsByName("isFavorite")[0].checked;
            if (favorite) {
                UtilFunctions.AddToFavorites(self.poiID);
            }
            else {
                UtilFunctions.RemoveFromFavorites(self.poiID);
            }
        };

        $scope.addReview = function () {
            $window.location.href = "#!review/" + self.poiID;
        }
    });