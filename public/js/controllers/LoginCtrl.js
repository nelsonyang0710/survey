// public/js/controllers/NerdCtrl.js
angular.module('LoginCtrl', []).controller('LoginController',['$scope','Authorization',function($scope,Authorization) {
    $scope.data={};
    $scope.login = function(){
        Authorization.login($scope.data).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
    }
}]);