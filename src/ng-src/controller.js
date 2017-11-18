// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",['restangular']);

// Constants
app.constant("APIBASEURL","https://api.github.com/users/srubio131/");

// Controladores
app.controller("MainCtrl", ["$scope", "Restangular", "APIBASEURL",  function ($scope,Restangular,APIBASEURL) {

    // Set baseUrl api github
    Restangular.setBaseUrl(APIBASEURL);

    Restangular.all('repos').getList().then(function(repos){
        $scope.repos = repos;
    }).catch(function (error) {
        console.error("Error get!! - ", error);
    });
}]);
