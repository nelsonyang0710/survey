// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['ui.bootstrap']).controller('MainController', ['$scope', function ($scope) {

    }])
    .directive('header', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: "views/header.html",
            controller: ['$scope', '$location', '$rootScope', function ($scope, $location, $scope) {
                $scope.$on('$locationChangeStart', function () {
                    $scope.navCollapsed = true;
                });
                $scope.navCollapsed = true;
                $scope.navLinks = [{
                    title: '',
                    linkText: 'Home',
                }, {
                    title: 'login',
                    linkText: 'Login'
                }, {
                    title: 'register',
                    linkText: 'Register'
                }, {
                    title: 'sample',
                    linkText: 'Sample'
                }];
                $scope.toggleNavBar = function () {
                    $scope.navCollapsed = !$scope.navCollapsed;
                };
                $scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1);
                    return page === currentRoute ? 'active' : '';
                };
            }]
        }
    });