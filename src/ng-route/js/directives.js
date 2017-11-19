var app = angular.module("CursoAngularJS");

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