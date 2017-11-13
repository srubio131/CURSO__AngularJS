// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",[]);

// Inyección de dependencias $scope, $http, etc
app.controller("MainCtrl", ["$scope", "$http", function ($scope,$http) {
    $scope.posts = [];
    $http.get('https://jsonplaceholder.typicode.com/posts')
        .success(function (data) {
            $scope.posts = data;
        }).error(function (error) {
            console.error("Error!! - ", error);
        });
}]);
