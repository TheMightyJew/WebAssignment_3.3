angular.module("myApp")
    .controller("loginController", function ($scope, $window) {
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
                if (false) {
                    $window.sessionStorage.setItem(isLogged, true);
                    $window.sessionStorage.setItem(token, userToken);
                    $window.sessionStorage.setItem(username, $scope.username);
                }
            }
            else{
                self.recover = false;
            }
        };

    });