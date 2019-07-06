// poi controller
angular.module("myApp")
    .controller("favoritesController", function ($scope,$rootScope, $window, ServerHandler, UtilFunctions) {
        self = this;
        initPoints();

        function initPoints() {
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));

            $scope.indexes = [];

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

                $scope.indexes.push(i);
            }
            $rootScope.favoritesCount = favorites.length;
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
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));

            ServerHandler.Update_Favorites_List(token, favorites)
                .then(function (response) {
                    //console.log('Success!');
                    //console.log(response);
                    UtilFunctions.Message('Saved the favorites successfully!')
                }).catch(function (err) {
                    //console.log('There was a problem :(');
                    //console.log(err);
                    UtilFunctions.Message('There was an error saving the favorites :(')
                })
        }

        $scope.movePOI = function(POI_ID){
            self.currentPOIToMove = POI_ID;

            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
            
            $scope.selectedIndex = favorites.findIndex(function(obj){
                return obj.POI_ID === POI_ID;
            });

            var modal = document.getElementById('ChangeLocationDialog');
            modal.showModal();
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

        $scope.confirmChoice = function(selectedIndex){
            var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
            var temp = [];
			var seenPOI = false;
            for(var i = 0; i < favorites.length; i++){
                if(i < selectedIndex){
                    if(favorites[i].POI_ID === self.currentPOIToMove){
                        seenPOI = true;
                    }
					if(seenPOI){
						temp.push(favorites[i+1]);
					}
					else{
						temp.push(favorites[i]);
					}              
                }
                else if(i === selectedIndex){
                    if(favorites[i].POI_ID === self.currentPOIToMove){
                        seenPOI = true;
                        temp.push(favorites[i]);
                    }
                    else{
                        var current = favorites.filter(function( obj ) {
                            return obj.POI_ID === self.currentPOIToMove;
                        })[0];
                        temp.push(current);
                    }
                }
				else{ //(i > selectedIndex){
					if(seenPOI){
						temp.push(favorites[i]);
					}
					else{
						temp.push(favorites[i-1]);
                    }  
                    if(favorites[i].POI_ID === self.currentPOIToMove){
                        seenPOI = true;
                    }
				}
            }

            $window.sessionStorage.setItem("favorites", JSON.stringify(temp));

            closeChoice();
            initPoints();
        }

        $scope.cancelChoice = function(){
            closeChoice();
        }

        function closeChoice(){
            var modal = document.getElementById('ChangeLocationDialog');
            modal.close();
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