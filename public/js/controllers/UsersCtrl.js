(function () {
    angular.module('UsersCtrl', []).controller('UsersController', ['$scope', 'Authorization', function ($scope, Authorization) {
        var user = Authorization.get().then(function(data){
            console.log(data);
        })
    }]);
})();