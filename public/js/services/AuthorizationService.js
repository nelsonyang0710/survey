// public/js/services/NerdService.js
angular.module('AuthorizationService', []).factory('Authorization', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/nerds');
        },
        create : function(data) {
            return $http.post('/api/users/register', data);
        },
        login : function(data) {
            return $http.post('/api/users/authenticate', data);
        },
        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }

}]);