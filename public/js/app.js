// public/js/app.js
(function () {
        angular
            .module('nelsonApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'LoginCtrl', 'RegisterCtrl', 'UsersCtrl', 'AuthorizationService'])
            .run(['$http',function($http){
                $http.get('/api/users/token').then(function(response){
                    window.jwtToken = response.data;
                })
            }])
        ;
    //    $(function () {
    //    // get JWT token from server
    //    $.get('/app/token', function (token) {
    //        window.jwtToken = token;
    //
    //        angular.bootstrap(document, ['app']);
    //    });
    //});
    })();