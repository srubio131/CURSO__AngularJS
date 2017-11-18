// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",['restangular']);

// Constants
app.constant("APIBASEURL","https://api.github.com/users/srubio131/");

// Values
app.value("cssCircular", {
    'border-radius': '50%',
    'width': '100px',
    'height': '100px',
    'display': 'inline-block'
});

// Directivas
app.directive("backImg", ["cssCircular", function(cssCircular){
    return function(scope,element,attrs){
        element.css(cssCircular);
        // Valor del elemento que tiene la directiva back-img una vez angularjs
        // ha procesado su valor
        attrs.$observe('backImg', function(value) {
            element.css({
                'background': 'url('+value+')',
                'background-position': 'center',
                'background-size': 'cover'
            });
        });
    }
}]);

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
