angular.module("myApp")
    .controller("loginController", function ($scope, $window,$rootScope) {
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
                $rootScope.loggedUsername = $scope.username;
                $rootScope.isLogged = true;
                $window.location.href = "#!homeRegistered"
                if (false) {
                    $window.sessionStorage.setItem(isLogged, true);
                    $window.sessionStorage.setItem(token, userToken);
                    $window.sessionStorage.setItem(username, $scope.username);
                    $rootScope.loggedUsername = $scope.username;
                    $rootScope.isLogged = true;
                }
            }
            else{
                self.recover = false;
            }
        };

    });