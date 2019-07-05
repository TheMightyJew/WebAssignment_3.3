angular.module("myApp")
    .controller("loginController", function ($scope,$rootScope, $window, $rootScope, ServerHandler, UtilFunctions) {
        self.recover = false;
        $scope.recoverPassword = function () {
            self.recover = true;
            if ($scope.username === undefined) {
                UtilFunctions.Message("Please enter the username that you wish to recover");
            }
            else {
                ServerHandler.Get_Security_Question($scope.username)
                .then(function(response){
                    //username exists
                    $window.location.href = "#!recoverPassword/" + $scope.username;
                })
                .catch(function(err){
                    //username does not exist
                    UtilFunctions.Message("This username does not exist");
                })
            }
        };
        $scope.login = function () {
            if (self.recover === false) {
                //check if right credensionals
                ServerHandler.Login($scope.username, $scope.password)
                    .then(function (response) {
                        //console.log('Logged in successfully!');
                        //console.log(response);
                        self.userToken = response.Token;
                        $window.sessionStorage.setItem('isLogged', true);
                        $window.sessionStorage.setItem('token', self.userToken);
                        $window.sessionStorage.setItem('username', $scope.username);
                        UtilFunctions.Message("Logged in successfully");
                        $rootScope.loggedUsername = $scope.username;

                        ServerHandler.Get_All_Favorites(self.userToken)
                        .then(function(favorites){
                            $window.sessionStorage.setItem("favorites",JSON.stringify(favorites));
                            $rootScope.favoritesCount = favorites.length
                            $rootScope.isLogged = true;
                            $window.location.href = "#!homeRegistered"
                        })
                        .catch(function(err){
                            $window.sessionStorage.setItem("favorites",JSON.stringify([]));
                            $rootScope.favoritesCount = 0;
                            $rootScope.isLogged = true;
                            $window.location.href = "#!homeRegistered"
                        })
                        

                    }).catch(function (err) {
                        console.log('There was a problem with the log in');
                        console.log(err);
                        UtilFunctions.Message("Failed");
                    })
            }
            else {
                self.recover = false;
            }
        };

    });