// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",[]);

// Inyección de dependencias $scope, $http, etc
app.controller("MainCtrl", ["$scope", function ($scope) {
   $scope.comentarios = [
       {
           username: "Pocholo",
           comentario: "Buena onda wey"
       },
       {
           username: "Paquito el Chocolatero",
           comentario: "Tiro riro rari tirori tirori eh eh!"
       }
   ];

   $scope.agregarComentario = function(username, comentario) {
       if (username !== '' && comentario !== '') {
           var comment = {
               username: username,
               comentario: comentario
           };
           // Añadir al array de comentarios
           $scope.comentarios.push(comment);
           // Limpiar inputs
           $scope.username = '';
           $scope.comentario = '';
       }
   };
}]);
