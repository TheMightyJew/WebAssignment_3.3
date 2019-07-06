// poiUser controller
angular.module("myApp")
    .controller("homeRegisteredController", function ($scope, $window, ServerHandler, UtilFunctions) {
        self = this;
        $scope.isLogged = UtilFunctions.isLogged();

        var token = $window.sessionStorage.getItem('token');
        ServerHandler.Get_Topics()
            .then(function (topics) {

                initTopics(topics);

                ServerHandler.Get_Recommended_Points_Of_Interest(token)
                    .then(function (POIs) {
                        initPoints(POIs, updateViewTopicPoints);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })

                ServerHandler.Get_Two_Last_Saved_Points_Of_Interest(token)
                    .then(function (POIs) {
                        initPoints(POIs, updateViewFavorites);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })


            })
            .catch(function (err) {
                console.log(err);
            })
        function initPoints(poiList, updateView) {
            var images_list = [];
            var details_list = [];
            var Points = [];
            var passed = 0;
            for (var i = 0; i < poiList.length; i++) {
                var curr_ID = poiList[i].POI_ID;
                var curr_POI = new Object();
                curr_POI.POI_ID = curr_ID;
                Points.push(curr_POI);
                details_list.push(ServerHandler.Get_Details_About_A_Point_Of_Interest(curr_ID));
                images_list.push(ServerHandler.Get_POI_Image(curr_ID));
            }

            Promise.all(details_list)
                .then((details) => {
                    for (var i = 0; i < details.length; i++) {
                        Points[i].Name = details[i].POI_Name;
                        Points[i].Rank = details[i].Percentage_Rank;
                        Points[i].Topic_ID = details[i].Topic_ID;
                    }
                    //console.log(details);
                    passed++;
                    if (passed === 2) {
                        //console.log('Done here');
                        updateView(Points);
                        //$scope.$apply();
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
                        //console.log('Done here');
                        updateView(Points);
                        //$scope.$apply();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function initTopics(topics) {
            self.topics = topics;
        }

        function updateViewTopicPoints(Points) {
            fixFavoritesAndTopics(Points);
            $scope.poiTopic1 = Points[0];
            $scope.clickedTopic1 = $scope.poiTopic1.Is_Favorite;
            $scope.poiTopic2 = Points[1];
            $scope.clickedTopic2 = $scope.poiTopic2.Is_Favorite;
            $scope.$apply();
        }

        function updateViewFavorites(Points) {
            fixFavoritesAndTopics(Points);
            $scope.lastSaved = Points[0];
            $scope.clickedLastSaved = $scope.lastSaved.Is_Favorite;
            $scope.previousSaved = Points[1];
            $scope.clickedPrev = $scope.previousSaved.Is_Favorite;
            $scope.$apply();
        }

        function fixFavoritesAndTopics(Points){
            for (var i = 0; i < Points.length; i++) {
                Points[i].Topic = self.topics.filter(function (topic) {
                    return topic.Topic_ID === Points[i].Topic_ID;
                })[0].Topic;
            }

            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
            for(var j = 0; j < Points.length; j++){
                var favorite;
                if(UtilFunctions.isLogged())
                    favorite = favorites.filter(function(e) { return e.POI_ID === Points[j].POI_ID; }).length > 0;
                else
                    favorite = false;
                    
                Points[j].Is_Favorite = favorite;
            }
        }

        $scope.showPoi = function (poiID) {
            $window.location.href = "#!poiDetails/" + poiID;
        };
        $scope.favoriteChange = function (i, POI_ID) {
            var favorite = document.getElementsByName("isFavorite")[i]//.checked;
            if (favorite.checked) {
                UtilFunctions.AddToFavorites(POI_ID);
            }
            else {
                UtilFunctions.RemoveFromFavorites(POI_ID);
            }
        };
    });