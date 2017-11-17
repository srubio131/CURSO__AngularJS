// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",[]);

// Main
app.run(function($rootScope) {
    $rootScope.nombre = "Juanito el del beso";
});

// Controladores
app.controller("MainCtrl", ["$scope", function ($scope) {
    $scope.nombre = "Era Pepe el del beso";
}]);

app.controller("ChildController", ["$scope", function ($scope) {

}]);
