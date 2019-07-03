// poi controller
angular.module("myApp")
    .controller("exploreController", function ($scope, $window, ServerHandler) {
        self = this;

        ServerHandler.Get_Random_Points_Of_Interests()
        .then(function (response) {
            //How the fuck do I perform a loop here
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
                    $scope.$apply();
                    //console.log(Points);
                    //self.Points = Points;
                    //initializePOI(Points);
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
                    $scope.$apply();
                    //console.log(Points);
                    //self.Points = Points;
                    //initializePOI(Points);
                }
            })
            .catch((err)=>{
                console.log(err);
            })

        }).catch(function (err) {
            console.log('There was a problem');
            console.log(err);
        })

        function initializePOI(Points){
            var jsonObj = {};
            for(var i = 0; i < Points.length; i++){
                jsonObj.push(Points[i]);
            }
            self.Points = jsonObj;
        }


        self.pointsOfInterests = {
            1: { name: "Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg" },
            2: { name: "Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg" },
            3: { name: "London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg" }
        };
        $scope.showPoi = function (POI_ID) {
            $window.location.href = "#!poiDetails/" + POI_ID;
        };

    //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzbnIiLCJVc2VybmFtZSI6ImEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2MjA4NjkxOSwiZXhwIjoxNTYyMTczMzE5fQ.jKr19KY0dE5JHfUzcwzZ1gOc_YUbX29bTsQZLELVKt0'
    
    /* Login example
    ServerHandler.Login('a', 'a')
    .then(function(response){
        console.log('Success!');
        console.log(response);
    }).catch(function(err){
        console.log('There was a problem :(');
        console.log(err);
    })
    */

    /*
    ServerHandler.Get_POI_Name(1)
    .then(function(response){
        console.log('Success!');
        console.log(response);
    }).catch(function(err){
        console.log('There was a problem :(');
        console.log(err);
    })
    */
    
    // Update_Favorites_List_Locations example:
    //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzbnIiLCJVc2VybmFtZSI6ImEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU2MjAwMTA2MiwiZXhwIjoxNTYyMDg3NDYyfQ.cMPOwpP76Pyndf5vPTbsADJkILndgKexQbiGxeP5kOw'
    /*var favorites = [];
    favorites.push({
        POI_ID: 0,
        Location: 0
    });
    favorites.push({
        POI_ID: 3,
        Location: 1
    });
    favorites.push({
        POI_ID: 15,
        Location: 2
    });
    favorites.push({
        POI_ID: 1,
        Location: 3
    });
    ServerHandler.Update_Favorites_List_Locations(token, favorites)
    .then(function(response){
        console.log('Success!');
        console.log(response);
    }).catch(function(err){
        console.log('There was a problem :(');
        console.log(err);
    })*/
    
    
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

    ServerHandler.Register_User('yyt','1yyyy','y','y','y','Israel','y@y.com',topics,questions).then(function(response){
        console.log('Success!');
        console.log(response);
    }).catch(function(err){
        console.log('There was a problem :(');
        console.log(err);
    });
    */
    
    
    
});
