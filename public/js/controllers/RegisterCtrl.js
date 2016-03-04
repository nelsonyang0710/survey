
angular.module('RegisterCtrl', []).controller('RegisterController', ['$scope','Authorization',function($scope,Authorization) {
    $scope.data={};
    $scope.createUser = function(){
        Authorization.create($scope.data).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });

    }
}]);