angular.module("myApp")
    .controller("registerController", function ($scope, $window, ServerHandler, UtilFunctions) {

        //load the topics:
        ServerHandler.Get_Topics()
        .then(function (response) {
            console.log('Success!');
            var only_topics = [];
            for(var i = 0; i < response.length; i++){
                only_topics.push(response[i].Topic);
            }
            $scope.topics = only_topics;
            //console.log(response);
        }).catch(function (err) {
            console.log('There was a problem :(');
            //console.log(err);
        });

        //load the security questions:
        ServerHandler.Get_All_Security_Questions()
        .then(function (response) {
            console.log('Success!');
            var only_questions = [];
            for(var i = 0; i < response.length; i++){
                only_questions.push(response[i].Question);
            }
            $scope.questions = only_questions;
            //console.log(response);
        }).catch(function (err) {
            console.log('There was a problem :(');
            //console.log(err);
        });

        //load the countries:
        ServerHandler.Get_Countries()
        .then(function (response) {
            console.log('Success!');
            var only_countries = [];
            for(var i = 0; i < response.length; i++){
                only_countries.push(response[i].Country);
            }
            $scope.countries = only_countries;
            //console.log(response);
        }).catch(function (err) {
            console.log('There was a problem :(');
        });

        $scope.register = function () {
            var firstQindex = document.getElementsByName('firstRecoveryQuestion')[0].selectedIndex;
            var secondQindex = document.getElementsByName('secondRecoveryQuestion')[0].selectedIndex;
            if(firstQindex === secondQindex){
                UtilFunctions.Message("Recovery Questions must be different")";
                return;
            }
            var questions = [];
            questions.push({
                Question_ID: document.getElementsByName('firstRecoveryQuestion')[0].selectedIndex,
                Answer: $scope.firstRecoveryAnswer
            });
            questions.push({
                Question_ID: document.getElementsByName('secondRecoveryQuestion')[0].selectedIndex,
                Answer: $scope.secondRecoveryAnswer
            });
            /*
            questions.push({
                Question_ID: 2,
                Answer: 'pet'
            });
            */

            var topics = [];
            var options = document.getElementsByName('selectedTopics')[0].options;
            for(var i=0;i<options;i++){
                if(options[0].selected){
                    topics.push({
                        Topic_ID: i
                    });
                }
            }
            /*topics.push({
                Topic_ID: document.getElementsByName('selectedTopic1')[0].selectedIndex
            });
            topics.push({
                Topic_ID: document.getElementsByName('selectedTopic2')[0].selectedIndex
            });*/

            //                                          Username,Password,              First_Name,Last_Name,                               City,                   Country,                    Email,      Topics_List,Security_Questions_List
            ServerHandler.Register_User($scope.registerUsername, $scope.registerPassword, $scope.registerFirstName, $scope.registerLastName, $scope.registerCity, $scope.selectedCountry, $scope.registerEmail, topics, questions)
            .then(function (response) {
                console.log('Success!');
                UtilFunctions.Message(response);
                $window.location.href = '#!login';
                //console.log(response);
            }).catch(function (err) {
                console.log('There was a problem :(');
                UtilFunctions.Message(err);
                //UtilFunctions.Message('There was a problem with the registeration');
                //console.log(err);
            });
        };
    });