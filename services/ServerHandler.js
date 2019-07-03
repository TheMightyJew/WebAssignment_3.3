var serverURL = 'http://192.168.1.15:3000';

// ServerHandler service
app.service('ServerHandler', function($http) {
    //works
    this.Get_Details_About_A_Point_Of_Interest = function(POI_ID) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_Details_About_A_Point_Of_Interest/' + POI_ID
            }

            sendRequest(req, resolve, reject, function(data){
                return data.POI_ID !== undefined;
            });
        });
    }

    //works
    this.Get_Security_Question = function(Username) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_Security_Question/' + Username
            }

            sendRequest(req, resolve, reject, function(data){
                return data.Question_ID !== undefined;
            });
        });
    }

    //works
    this.Restore_Password = function(Username, Question_ID, Answer) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Restore_Password',
                data: {
                    Username: Username,
                    Question_ID: Question_ID,
                    Answer: Answer
                }
            }

            sendRequest(req, resolve, reject, function(data){
                return data.Password !== undefined;
            });
        });
    }

    //works
    this.Get_Random_Points_Of_Interests = function() {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_Random_Points_Of_Interests'
            }

            sendRequest(req, resolve, reject, checkPOIList);
        });
    }

    //works
    this.Get_Recommended_Points_Of_Interest = function(Token) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Get_Recommended_Points_Of_Interest',
                headers: {
                    'x-auth-token': Token
                }
            }

            sendRequest(req, resolve, reject, checkPOIList);
        });
    }

    //works
    this.Get_Two_Last_Saved_Points_Of_Interest = function(Token) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Get_Two_Last_Saved_Points_Of_Interest',
                headers: {
                    'x-auth-token': Token
                }
            }

            sendRequest(req, resolve, reject, checkPOIList);
        });
    }

    //works
    this.Register_User = function(Username,Password,First_Name,Last_Name,City,Country,Email,Topics_List,Security_Questions_List) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Register_User',
                data: {
                    Username: Username,
                    Password: Password,
                    First_Name: First_Name,
                    Last_Name: Last_Name,
                    City: City,
                    Country: Country,
                    Email: Email,
                    Topics_List: Topics_List,
                    Security_Questions_List: Security_Questions_List
                }
            }

            sendRequest(req, resolve, reject, function(data){
                return data === 'Successfuly added the new user!';
            });
        });
    }

    //works
    this.Login = function(Username,Password) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Login',
                data: {
                    Username: Username,
                    Password: Password
                }
            }

            sendRequest(req, resolve, reject, function(data){
                return data.Token !== undefined;
            });
        });
    }

    //works
    this.Get_All_Points_Of_Interest = function() {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_All_Points_Of_Interest'
            }

            sendRequest(req, resolve, reject, checkPOIList);
        });
    }

    //works
    this.Get_Points_Of_Interest_By_Topic = function(Topic_ID) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_Points_Of_Interest_By_Topic/' + Topic_ID
            }

            sendRequest(req, resolve, reject, checkPOIList);
        });
    }

    //works
    this.Get_Points_Of_Interest_By_Name = function(POI_Name) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_Points_Of_Interest_By_Name/' + POI_Name
            }

            sendRequest(req, resolve, reject, checkPOIList);
        });
    }

    //works
    this.Get_All_Favorites = function(Token) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Get_All_Favorites',
                headers: {
                    'x-auth-token': Token
                }
            }

            sendRequest(req, resolve, reject, checkPOIList);
        });
    }

    //works
    this.Add_To_Favorites = function(Token, POI_ID) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Add_To_Favorites',
                headers: {
                    'x-auth-token': Token
                },
                data: {
                    POI_ID: POI_ID
                }
            }

            sendRequest(req, resolve, reject, checkSuccess);
        });
    }

    //works
    this.Remove_From_Favorites = function(Token, POI_ID) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'PUT',
                url: serverURL + '/Remove_From_Favorites',
                headers: {
                    'x-auth-token': Token
                },
                data: {
                    POI_ID: POI_ID
                }
            }

            sendRequest(req, resolve, reject, checkSuccess);
        });
    }

    //works
    this.Update_Favorite_Location = function(Token, POI_ID, Location) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'PUT',
                url: serverURL + '/Update_Favorite_Location',
                headers: {
                    'x-auth-token': Token
                },
                data: {
                    POI_ID: POI_ID,
                    Location: Location
                }
            }

            sendRequest(req, resolve, reject, checkSuccess);
        });
    }

    //works
    this.Update_Favorites_List_Locations = function(Token, POI_And_Location_List) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'PUT',
                url: serverURL + '/Update_Favorites_List_Locations',
                headers: {
                    'x-auth-token': Token
                },
                data: {
                    POI_And_Location_List: POI_And_Location_List
                }
            }

            sendRequest(req, resolve, reject, checkSuccess);
        });
    }

    //works
    this.Add_Review = function(Token, POI_ID, Rank, Description) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'POST',
                url: serverURL + '/Add_Review',
                headers: {
                    'x-auth-token': Token
                },
                data: {
                    Review: {
                        POI_ID: POI_ID,
                        Rank: Rank,
                        Description: Description
                    }
                }
            }

            sendRequest(req, resolve, reject, checkSuccess);
        });
    }

    //works
    this.Get_POI_Image = function(POI_ID) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_POI_Image/' + POI_ID
            }

            sendRequest(req, resolve, reject, function(data){
                return data.Image_Path !== undefined;
            });
        });
    }

    //works
    this.Get_POI_Name = function(POI_ID) {
        return new Promise(function(resolve, reject){
            var req = {
                method: 'GET',
                url: serverURL + '/Get_POI_Name/' + POI_ID
            }

            sendRequest(req, resolve, reject, function(data){
                return data.POI_Name !== undefined;
            });
        });
    }

    function sendRequest(req, resolve, reject, isGoodResult){
        $http(req).then(function Success(response){
            if(isGoodResult(response.data)){
                resolve(response.data);
            }
            else{
                reject(response.data);
            }
        }, function Failure(response){
            console.log(response)
            reject(response.data);
        });
    }

    function checkPOIList(data){
        return data !== undefined && data.length > 0 && data[0].POI_ID !== undefined;
    }

    function checkSuccess(data){
        return data === 'Success';
    }
})

