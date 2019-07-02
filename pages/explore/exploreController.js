// poi controller
angular.module("myApp")
    .controller("exploreController", function ($scope, $window) {
        self = this;
        self.pointsOfInterests = {
            1: { name: "Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg" },
            2: { name: "Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg" },
            3: { name: "London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg" }
        };
        $scope.showPoi = function (poiName) {
            $window.location.href = "#!poiDetails/:" + poiName;
        };

            /* Restore_Password example:
    ServerHandler.Restore_Password('a', 0, 'mom').then(function(response){
        console.log(response);
    });
    */
    
    /* Update_Favorites_List_Locations example:
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzbnIiLCJVc2VybmFtZSI6ImEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2MjAwMTA2MiwiZXhwIjoxNTYyMDg3NDYyfQ.cMPOwpP76Pyndf5vPTbsADJkILndgKexQbiGxeP5kOw'
    var favorites = [];
    favorites.push({
        POI_ID: 0,
        Location: 0
    });
    favorites.push({
        POI_ID: 4,
        Location: 1
    });
    favorites.push({
        POI_ID: 1,
        Location: 2
    });
    favorites.push({
        POI_ID: 5,
        Location: 3
    });
    ServerHandler.Update_Favorites_List_Locations(token, favorites).then(function(response){
        console.log(response);
    });
    */
    
    /* register user example:
    var topics = [];
    topics.push({
        Topic_ID: 0
    });
    topics.push({
        Topic_ID: 3
    });
    var questions = [];
    questions.push({
        Question_ID: 0,
        Answer: 'mom'
    });
    questions.push({
        Question_ID: 2,
        Answer: 'pet'
    });

    ServerHandler.Register_User('yyy','1yyyy','y','y','y','Israel','y@y.com',topics,questions).then(function(response){
        console.log(response);
    });
    */
    });