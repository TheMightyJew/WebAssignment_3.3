// poi controller
angular.module("myApp")
.controller("poiController", function ($scope, $window, ServerHandler, UtilFunctions) {
    self = this;
    $scope.isLogged = UtilFunctions.isLogged();
    //load all POI to pointsOfInterests
    //load all categories to categories +all option ( should be defult )
    ServerHandler.Get_Topics()
    .then(function(topics){
        
        initTopics(topics);

        ServerHandler.Get_All_Points_Of_Interest()
        .then(function(poiList){
            initPoints(poiList, topics);
        })
        .catch(function(err){
            console.log(err);
        })
    })
    .catch(function(err){
        console.log(err);
    })

    function initTopics(topics){
        $scope.categories = [];
        $scope.categories.push({
            Topic_ID: -1,
            Topic: 'Show All'
        });
        for(var i = 0; i < topics.length; i++){
            $scope.categories.push(topics[i]);
        }
        
        $scope.selectedCategory = $scope.categories[0];
    }

    function initPoints(poiList, topics) {
        images_list = [];
        details_list = [];
        Points = [];
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
                    buildFinalList(Points, topics);
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
                    buildFinalList(Points, topics);
                    //$scope.$apply();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function buildFinalList(Points, topics){
        var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
        topic_points = [];
        for(var i = 0; i < topics.length; i++){
            var curr_points = Points.filter(function(poi) { 
                return poi.Topic_ID === topics[i].Topic_ID;
            });

            for(var j = 0; j < curr_points.length; j++){
                var favorite = favorites.filter(function(e) { return e.POI_ID === curr_points[j].POI_ID; }).length > 0;

                curr_points[j].Is_Favorite = favorite;
            }

            topic_points.push({
                Topic: topics[i].Topic,
                Points: curr_points
            })
        }

        $scope.pointsOfInterests = topic_points;
        $scope.$apply();
    }
    
    $scope.rankSort = function(){
        for(var i = 0; i < $scope.pointsOfInterests.length; i++){
            $scope.pointsOfInterests[i].Points.sort((a, b) => b.Rank - a.Rank);
        }
    }
    $scope.show = function(){
        //show only from a specific category
        var categories_select = document.getElementsByName('category')[0];
        var selectedCategory = $scope.categories[categories_select.selectedIndex];

        if(selectedCategory.Topic_ID === -1){
            //show all:
            ServerHandler.Get_All_Points_Of_Interest()
            .then(function(poiList){
                initPoints(poiList, $scope.categories);
            })
            .catch(function(err){
                console.log(err);
            })
        }
        else{
            ServerHandler.Get_Points_Of_Interest_By_Topic(selectedCategory.Topic_ID)
            .then(function(poiList){
                initPoints(poiList, $scope.categories);
            })
            .catch(function(err){
                console.log(err);
            })
        }
    }
    $scope.search = function(){
        //search POI by name:
        ServerHandler.Get_Points_Of_Interest_By_Name($scope.poiNameSearch)
            .then(function(poiList){
                initPoints(poiList, $scope.categories);
            })
            .catch(function(err){
                console.log(err);
            })
    }
    $scope.favoriteChange = function (POI_ID) {
        var favorite = document.getElementsByName("isFavorite."+POI_ID)[0].checked;

        if (favorite) {
            UtilFunctions.AddToFavorites(POI_ID);
        }
        else {
            UtilFunctions.RemoveFromFavorites(POI_ID);
        }
    };

    $scope.showPoi = function (POI_ID) {
        $window.location.href = "#!poiDetails/" + POI_ID;
    };
});