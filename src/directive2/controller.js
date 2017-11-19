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
app.directive("myAutocomplete", function () {
    // scope: scope del controlador que este activo en ese elemento donde se ha puesto la directiva
    // element: elemento donde se ha puesto la directiva
    // attrs: atributos del elemento donde se puso la directiva
    function link (scope,element,attrs) {
        $(element).autocomplete({
            source: scope[attrs.myAutocomplete],
            select: function (ev,ui) {
                ev.preventDefault();
                if(ui.item) {
                    scope.optionSelected(ui.item.value);
                }
            },
            focus: function (ev,ui) {
                ev.preventDefault();
                $(this).val(ui.item.label);
            }
        });
    };

    return {
        link: link
    }
});

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

    // Get all repos
    $scope.repos = [];
    Restangular.all('repos').getList().then(function(repos){
        $scope.img = repos[0].owner.avatar_url;
        for (i = 0; i < repos.length; i++) {
            $scope.repos.push(repos[i].name);
        }
    }).catch(function (error) {
        console.error("Error get!! - ", error);
    });

    // Initialize variables
    $scope.optionSelected = function (el) {
        $scope.$apply(function () {
           $scope.main_repo = el;
        });
    };

}]);
