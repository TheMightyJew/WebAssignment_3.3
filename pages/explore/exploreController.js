// poi controller
angular.module("myApp")
    .controller("exploreController", function ($scope, $window, ServerHandler, UtilFunctions) {
        self = this;
        $scope.isLogged = UtilFunctions.isLogged();
        ServerHandler.Get_Random_Points_Of_Interests()
            .then(function (response) {
                names_list = [];
                images_list = [];
                $scope.Points = [];
                var passed = 0;
                for (var i = 0; i < response.length; i++) {
                    var curr_ID = response[i].POI_ID;
                    var curr_POI = new Object();
                    curr_POI.POI_ID = curr_ID;
                    $scope.Points.push(curr_POI);
                    names_list.push(ServerHandler.Get_POI_Name(curr_ID));
                    images_list.push(ServerHandler.Get_POI_Image(curr_ID));
                }

                Promise.all(names_list)
                    .then((names) => {
                        for (var i = 0; i < names.length; i++) {
                            $scope.Points[i].Name = names[i].POI_Name;
                        }
                        //console.log(names);
                        passed++;
                        if (passed === 2) {
                            fixFavorites();
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
                            fixFavorites();
                            $scope.$apply();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            }).catch(function (err) {
                console.log('There was a problem');
                console.log(err);
            })

        function fixFavorites() {
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
            for (var j = 0; j < $scope.Points.length; j++) {
                var favorite;
                if (UtilFunctions.isLogged())
                    favorite = favorites.filter(function (e) { return e.POI_ID === $scope.Points[j].POI_ID; }).length > 0;
                else
                    favorite = false;

                $scope.Points[j].Is_Favorite = favorite;
            }
        }

        function showPressedFavorites(){
            for(var i = 0; i < $scope.Points.length; i++){
                $scope.clickedLastSaved = $scope.lastSaved.Is_Favorite;
            }
            
        }

        function initializePOI(Points) {
            var jsonObj = {};
            for (var i = 0; i < Points.length; i++) {
                jsonObj.push(Points[i]);
            }
            self.Points = jsonObj;
        }

        $scope.showPoi = function (POI_ID) {
            $window.location.href = "#!poiDetails/" + POI_ID;
        };

        $scope.favoriteChange = function (POI_ID) {
            var favorite = document.getElementsByName("isFavorite" + POI_ID)[0].checked;
            if (favorite) {
                UtilFunctions.AddToFavorites(POI_ID);
            }
            else {
                UtilFunctions.RemoveFromFavorites(POI_ID);
            }
        };
    });
