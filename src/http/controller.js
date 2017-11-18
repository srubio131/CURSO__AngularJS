// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",[]);

// Inyección de dependencias $scope, $http, etc
app.controller("MainCtrl", ["$scope", "$http", function ($scope,$http) {
    $scope.posts = [];

    $http.get('https://jsonplaceholder.typicode.com/posts')
        .success(function (data) {
            $scope.posts = data;
        }).error(function (error) {
            console.error("Error get!! - ", error);
        });

    $scope.addPost = function (title, body) {
        $http.post('https://jsonplaceholder.typicode.com/posts', {
            title: title,
            body: body,
            userId: 1
        }).success(function (data,status,headers,config) {
            // Agregar el post al array
            $scope.posts.push(data);
            // Inicializar variables
            $scope.newTitle = '';
            $scope.newBody  = '';
        })
        .error(function (error,status,headers,config) {
            console.error("Error post!! - ", error);
        });
    };

}]);
