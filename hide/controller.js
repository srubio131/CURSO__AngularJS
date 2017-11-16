// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",['restangular']);

// Inyección de dependencias $scope, $http, etc
app.controller("MainCtrl", ["$scope", "Restangular", function ($scope,Restangular) {
    $scope.posts = [];
    $scope.loading = true;
    Restangular.setBaseUrl('https://jsonplaceholder.typicode.com/');

    Restangular.all('posts').getList().then(function(posts){
        $scope.posts = posts;
        $scope.loading = false;
    }).catch(function (error) {
        console.error("Error get!! - ", error);
        $scope.loading = false;
    });

}]);
