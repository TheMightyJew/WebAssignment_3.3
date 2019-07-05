
app.service('UtilFunctions', function ($window,$rootScope) {
    this.Message = function (note) {
        $window.alert(note);
    }

    this.RemoveFromFavorites = function(POI_ID){
        var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
        favorites = favorites.filter(function( obj ) {
            return obj.POI_ID !== POI_ID;
        });
        $window.sessionStorage.setItem("favorites", JSON.stringify(favorites));
        $rootScope.favoritesCount = $rootScope.favoritesCount-1;
    }

    this.AddToFavorites = function(POI_ID){
        var favorites = JSON.parse($window.sessionStorage.getItem("favorites"));
        //add new poi to favorites
        $window.sessionStorage.setItem("favorites", JSON.stringify(favorites));
        $rootScope.favoritesCount = $rootScope.favoritesCount+1;
    }

    this.isLogged = function(){
        self.logged = $window.sessionStorage.getItem("isLogged");
        if (self.logged === null || self.logged === undefined || self.logged === false) {
            return false;
        }
        else {
            return true;
        }
    }
});