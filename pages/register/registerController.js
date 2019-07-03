angular.module("myApp")
    .controller("registerController", function ($scope, ServerHandler) {
        $scope.register = function (UtilFunctions) {
            var topics = [];
            topics.push({
                Topic_ID: document.getElementsByName(selectedTopic1).selectedIndex
            });
            topics.push({
                Topic_ID: document.getElementsByName(selectedTopic2).selectedIndex
            });
            var questions = [];
            questions.push({
                Question_ID: document.getElementsByName(recoveryQuestion).selectedIndex,
                Answer: $scope.recoveryAnswer
            });
            /*
            questions.push({
                Question_ID: 2,
                Answer: 'pet'
            });
            */
            //                                          Username,Password,              First_Name,Last_Name,                               City,                   Country,                    Email,      Topics_List,Security_Questions_List
            ServerHandler.Register_User($scope.registerUsername, $scope.registerPassword, $scope.registerFirstName, $scope.registerLastName, $scope.registerCity, $scope.selectedCountry, $scope.registerEmail, topics, questions)
            .then(function (response) {
                console.log('Success!');
                UtilFunctions.Message(response);
                //console.log(response);
            }).catch(function (err) {
                console.log('There was a problem :(');
                UtilFunctions.Message('There was a problem with the registeration');
                //console.log(err);
            });
        };
    });