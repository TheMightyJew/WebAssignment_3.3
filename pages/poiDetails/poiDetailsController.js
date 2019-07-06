// poi controller
angular.module("myApp")
    .controller("poiDetailsController", function ($scope, $window, $routeParams, ServerHandler, UtilFunctions) {
        init();
        var refreshed = false;
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
                    if (!refreshed) {
                        $scope.poi.Number_Of_Views++;
                        ServerHandler.Add_View_To_POI(self.poiID)
                            .then(function (response) {
                                //console.log(response);
                            }).catch(function (err) {
                                console.log('There was a problem with Add View');
                                console.log(err);
                            })
                        refreshed = true;
                    }

                    initializeMap();

                    handleIsFavorite();

                }).catch(function (err) {
                    console.log('There was a problem');
                    console.log(err);
                    UtilFunctions.Message("Failed");
                })
        }

        function initializeMap() {
            var mymap = L.map('mapid').setView([$scope.poi.X, $scope.poi.Y], 16);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoidGhlbWlnaHR5amV3IiwiYSI6ImNqeHJnaGUzNzA0ajIzaXFvd2VlZ3o5YXkifQ.QL_fLXKobWPK2cVWQKZMjw'
            }).addTo(mymap);

            var marker = L.marker([$scope.poi.X, $scope.poi.Y]).addTo(mymap);
            marker.bindPopup("<b>" + $scope.poi.POI_Name + "</b>").openPopup();
        }

        function handleIsFavorite() {

            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));

            var favorite;
            if (UtilFunctions.isLogged())
                favorite = favorites.filter(function (e) { return e.POI_ID === $scope.poi.POI_ID; }).length > 0;
            else
                favorite = false;

            $scope.clickedFavorite = favorite;
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

        $scope.submitReview = function () {
            if (self.closeModal === false) {
                var rank = $scope.reviewRank;
                var description = $scope.description;
                var token = $window.sessionStorage.getItem('token');
                var POI_ID = $routeParams.poiID;
                ServerHandler.Add_Review(token, POI_ID, rank, description)
                    .then(function (response) {
                        UtilFunctions.Message('Uploaded the review successfully!');
                        $scope.closeReview();
                    }).catch(function (err) {
                        console.log(err);
                        UtilFunctions.Message('There was a problem uploading the review :(');
                    })
            }
            else {
                self.closeModal = false;
            }

        };
        $scope.closeReview = function () {
            self.closeModal = true;
            self.modal.close();
            init();
        }
    });