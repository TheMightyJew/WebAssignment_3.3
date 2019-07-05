angular.module("myApp")
    .controller("loginController", function ($scope,$rootScope, $window, $rootScope, ServerHandler, UtilFunctions) {
        self.recover = false;
        $scope.recoverPassword = function () {
            if ($scope.username === undefined) {
                $window.alert("error");
                self.recover = true;
            }
            else {
                $window.location.href = "#!recoverPassword";
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