// poi controller
angular.module("myApp")
    .controller("poiDetailsController", function ($scope, $window, $routeParams, ServerHandler, UtilFunctions) {
        init();
        function init() {
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
        }
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
           self.modal = document.getElementById("myDialog");
           self.closeModal = false;
           self.modal.showModal();
        
        }

        $scope.submitReview = function(){
            if(closeModal === false){
                var rank = $scope.reviewRank;
                var description = $scope.description;
                var token = $window.sessionStorage.getItem('token');
                var POI_ID = $routeParams.poiID;
                ServerHandler.Add_Review(token,POI_ID,rank,description)
                .then(function (response) {
                    UtilFunctions.Message('Uploaded the review successfully!');
                    closeReview();
                    //$window.location.href = "#!poiDetails/" + $routeParams.poiID;
                }).catch(function (err) {
                    console.log(err);
                    UtilFunctions.Message('There was a problem uploading the review :(');
                })
            }
            else{
                closeModal = false;
            }
    
        };
        $scope.closeReview = function(){
            self.closeModal = true;
            self.modal.closeModal();
            init();
        }
    });