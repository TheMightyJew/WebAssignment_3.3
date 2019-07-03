
app.service('UtilFunctions', function($window) {
    this.Message = function(note) {
        $window.alert(note);
    }
});