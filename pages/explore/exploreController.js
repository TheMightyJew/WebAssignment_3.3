// poi controller
angular.module("myApp")
    .controller("exploreController", function ($scope, $window, ServerHandler, UtilFunctions) {
        self = this;
        $scope.isLogged = UtilFunctions.isLogged();
        ServerHandler.Get_Random_Points_Of_Interests()
            .then(function (response) {
                names_list = [];
                images_list = [];
                Points = [];
                var passed = 0;
                for (var i = 0; i < response.length; i++) {
                    var curr_ID = response[i].POI_ID;
                    var curr_POI = new Object();
                    curr_POI.POI_ID = curr_ID;
                    Points.push(curr_POI);
                    names_list.push(ServerHandler.Get_POI_Name(curr_ID));
                    images_list.push(ServerHandler.Get_POI_Image(curr_ID));
                }

                Promise.all(names_list)
                    .then((names) => {
                        for (var i = 0; i < names.length; i++) {
                            Points[i].Name = names[i].POI_Name;
                        }
                        //console.log(names);
                        passed++;
                        if (passed === 2) {
                            fixFavorites(Points);
                            $scope.$apply();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                Promise.all(images_list)
                    .then((images) => {
                        for (var i = 0; i < images.length; i++) {
                            Points[i].Image_Path = images[i].Image_Path;
                        }
                        //console.log(images);
                        passed++;
                        if (passed === 2) {
                            fixFavorites(Points);
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

        function fixFavorites(Points) {
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
            for (var j = 0; j < Points.length; j++) {
                var favorite;
                if (UtilFunctions.isLogged())
                    favorite = favorites.filter(function (e) { return e.POI_ID === Points[j].POI_ID; }).length > 0;
                else
                    favorite = false;

                Points[j].Is_Favorite = favorite;
            }
            $scope.Points = Points;
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
            var favorite = document.getElementsByName("isFavorite." + POI_ID)[0].checked;
            if (favorite) {
                UtilFunctions.AddToFavorites(POI_ID);
            }
            else {
                UtilFunctions.RemoveFromFavorites(POI_ID);
            }
        };
    });
