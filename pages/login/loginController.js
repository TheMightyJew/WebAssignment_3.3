angular.module("myApp")
.controller("loginController", function ($scope,$window) {
    $scope.recoverPassword = function(){
        if($scope.username === undefined){
            $window.alert("error");
        }
    };
    $scope.login = function(){
        //check if right credensionals
        $window.alert($scope.username);
        if(false){
            $window.sessionStorage.setItem(isLogged,true);
            $window.sessionStorage.setItem(token,userToken);
            $window.sessionStorage.setItem(username,$scope.username);
        }
    };

});