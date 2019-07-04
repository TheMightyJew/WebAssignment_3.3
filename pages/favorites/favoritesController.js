// poi controller
angular.module("myApp")
    .controller("favoritesController", function ($scope, $window, ServerHandler) {
        self = this;

        var token = $window.sessionStorage.getItem('token');
        ServerHandler.Get_All_Favorites(token)
        .then(function (response) {
            //console.log(response);
            names_list = [];
            images_list = [];
            $scope.Points = [];
            var passed = 0;
            for(var i = 0; i < response.length; i++){
                var curr_ID = response[i].POI_ID;
                var curr_POI = new Object();
                curr_POI.POI_ID = curr_ID;
                $scope.Points.push(curr_POI);
                names_list.push(ServerHandler.Get_POI_Name(curr_ID));
                images_list.push(ServerHandler.Get_POI_Image(curr_ID));
            }

            Promise.all(names_list)
            .then((names)=>{
                for(var i = 0; i < names.length; i++){
                    $scope.Points[i].Name = names[i].POI_Name;
                }
                //console.log(names);
                passed++;
                if(passed === 2){
                    //console.log('Done here');
                    $scope.$apply();
                }
            })
            .catch((err)=>{
                console.log(err);
            })

            Promise.all(images_list)
            .then((images)=>{
                for(var i = 0; i < images.length; i++){
                    $scope.Points[i].Image_Path = images[i].Image_Path;
                }
                //console.log(images);
                passed++;
                if(passed === 2){
                    //console.log('Done here');
                    $scope.$apply();
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }).catch(function (err) {
            console.log(err);
            UtilFunctions.Message('There was a problem uploading the review :(');
        })
        
        $scope.showPoi = function (POI_ID) {
            $window.location.href = "#!poiDetails/" + POI_ID;
        };
        $scope.categoriesSort = function () {
            //stuff;
            saveLocalOrder();
        }
        $scope.rankSort = function () {
            //stuff;
            saveLocalOrder();
        }
        $scope.resetOrder = function () {
            //stuff;
            saveLocalOrder();
        }
        $scope.saveOrder = function () {

        }
        function saveLocalOrder() {
            //stuff
        }
    });