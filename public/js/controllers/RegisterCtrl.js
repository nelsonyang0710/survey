
angular.module('RegisterCtrl', []).controller('RegisterController', ['$scope','Authorization',function($scope,Authorization) {
    $scope.data={};
    $scope.createUser = function(){
        Authorization.create($scope.data)

    }
}]);