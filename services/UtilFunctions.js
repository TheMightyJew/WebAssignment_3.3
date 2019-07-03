
app.service('UtilFunctions', function() {
    this.Message = function(note) {
        $window.alert(note);
    }
});