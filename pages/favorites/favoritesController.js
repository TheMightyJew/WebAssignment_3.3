// poi controller
angular.module("myApp")
    .controller("favoritesController", function ($scope, $window, ServerHandler, UtilFunctions) {
        self = this;
        initPoints();

        function initPoints() {
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
            images_list = [];
            details_list = [];
            $scope.Points = [];
            var passed = 0;
            for (var i = 0; i < favorites.length; i++) {
                var curr_ID = favorites[i].POI_ID;
                var curr_POI = new Object();
                curr_POI.POI_ID = curr_ID;
                $scope.Points.push(curr_POI);
                details_list.push(ServerHandler.Get_Details_About_A_Point_Of_Interest(curr_ID));
                images_list.push(ServerHandler.Get_POI_Image(curr_ID));
            }

            Promise.all(details_list)
                .then((details) => {
                    for (var i = 0; i < details.length; i++) {
                        $scope.Points[i].Name = details[i].POI_Name;
                        $scope.Points[i].Rank = details[i].Percentage_Rank;
                        $scope.Points[i].Topic_ID = details[i].Topic_ID;
                    }
                    //console.log(details);
                    passed++;
                    if (passed === 2) {
                        //console.log('Done here');
                        $scope.$apply();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

            Promise.all(images_list)
                .then((images) => {
                    for (var i = 0; i < images.length; i++) {
                        $scope.Points[i].Image_Path = images[i].Image_Path;
                    }
                    //console.log(images);
                    passed++;
                    if (passed === 2) {
                        //console.log('Done here');
                        $scope.$apply();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }


        $scope.showPoi = function (POI_ID) {
            $window.location.href = "#!poiDetails/" + POI_ID;
        };
        $scope.categoriesSort = function () {
            $scope.Points.sort((a, b) => a.Topic_ID - b.Topic_ID);
            saveLocalOrder();
        }
        $scope.rankSort = function () {
            $scope.Points.sort((a, b) => b.Rank - a.Rank);
            saveLocalOrder();
        }
        $scope.resetFavorites = function () {
            var token = $window.sessionStorage.getItem("token");

            ServerHandler.Get_All_Favorites(token)
                .then(function (favorites) {
                    $window.sessionStorage.setItem("favorites", JSON.stringify(favorites));
                    initPoints();
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
        $scope.saveOrder = function () {
            var token = $window.sessionStorage.getItem("token");
            var poiAndLocationList = [];
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));

            for (var i = 0; i < favorites.length; i++) {
                poiAndLocationList.push({
                    POI_ID: favorites[i].POI_ID,
                    Location: i
                });
            }
            ServerHandler.Update_Favorites_List_Locations(token, poiAndLocationList)
                .then(function (response) {
                    //console.log('Success!');
                    //console.log(response);
                    UtilFunctions.Message('Saved the order of the favorites!')
                }).catch(function (err) {
                    //console.log('There was a problem :(');
                    //console.log(err);
                    UtilFunctions.Message('There was an error saving the favorites :(')
                })

        }
        function saveLocalOrder() {
            favorites = []
            for (var i = 0; i < $scope.Points.length; i++) {
                favorites.push({
                    POI_ID: $scope.Points[i].POI_ID
                });
            }

            $window.sessionStorage.setItem("favorites", JSON.stringify(favorites));
        }
        $scope.removePOI = function (poiID) {
            UtilFunctions.RemoveFromFavorites(poiID);
            updatePoints();
        }

        function updatePoints() {
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
            var temp = [];
            for (var i = 0; i < favorites.length; i++) {
                temp.push($scope.Points.find(obj => {
                    return obj.POI_ID === favorites[i].POI_ID;
                }));
            }
            $scope.Points = temp;
            //$scope.$apply();
        }
    });