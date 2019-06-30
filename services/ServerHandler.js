var serverURL = 'http://localhost:3000';

// ServerHandler service
app.service('ServerHandler', function($http) {
    this.Get_Details_About_A_Point_Of_Interest = function(POI_ID) {
        $http.get(serverURL + '/Get_Details_About_A_Point_Of_Interest/' + POI_ID).then(Success_Get_Details_About_A_Point_Of_Interest, Failure_Get_Details_About_A_Point_Of_Interest);
    }
})

function Success_Get_Details_About_A_Point_Of_Interest(response){
    console.log("success");
    console.log(response.data);
}

function Failure_Get_Details_About_A_Point_Of_Interest(response){
    console.log("Failure");
    console.log(response.data);
}
