angular.module("myApp")
    .controller("recoverPasswordController", function ($scope, $window, $routeParams, ServerHandler, UtilFunctions) {

        ServerHandler.Get_Security_Question($routeParams.username)
            .then(function (question) {
                $scope.recoverQuestion = question.Question;
                self.question = question;
                $scope.$apply();
            })
            .catch(function (err) {
                console.log(err);
            })

        $scope.recover = function () {
            ServerHandler.Restore_Password($routeParams.username, self.question.Question_ID, $scope.recoverAnswer)
            .then(function (password) {
                UtilFunctions.Message('Your password is: "' + password.Password + '"');
                $window.location.href = "#!login";
            })
            .catch(function (err) {
                UtilFunctions.Message('The answer that you have entered is wrong!');
            })
        };
    });