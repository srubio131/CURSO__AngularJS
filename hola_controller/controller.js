// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",["ngResource"]);

app.controller("controller", function ($scope) {
   $scope.nombre = "Sergio";
});
