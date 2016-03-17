// public/js/appRoutes.js
(function () {
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/users', {
                templateUrl: 'views/users.html',
                controller: 'UsersController'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);

    }]);
})();