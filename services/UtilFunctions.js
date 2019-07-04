
app.service('UtilFunctions', function ($window) {
    this.Message = function (note) {
        $window.alert(note);
    }

    this.RemoveFromFavorites = function(POI_ID){
        var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
        favorites = favorites.filter(function( obj ) {
            return obj.POI_ID !== POI_ID;
        });
        $window.sessionStorage.setItem("favorites", JSON.stringify(favorites));
    }
});