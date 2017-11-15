var app = angular.module("TodoList",["LocalStorageModule"]);

app.controller("MainCtrl", ["$scope", "localStorageService", function ($scope, localStorageService) {

    // Recuperar lista todos del storage
    if (localStorageService.get("angular-todolist")) {
        $scope.todos = localStorageService.get("angular-todolist");
    } else {
        $scope.todos = [];
    }

    // Observar cambios en nuewaTarea
    $scope.$watchCollection('todos',function (newvalue,oldvalue) {
        localStorageService.set("angular-todolist", $scope.todos);
    });

    // Añadir nueva tarea
    $scope.addTarea = function(tarea) {
        $scope.todos.push(tarea);
        $scope.nuevaTarea = {}; // Limpiar
    };

    // Limpiar lista
    $scope.clean = function () {
        $scope.todos = [];
    };

}]);

// Filtros
app.filter("reverse", function() {
    return function (text, isUpperCase) {
        var reverseText = text.split("").reverse().join("");
        return isUpperCase ? reverseText.toUpperCase() : reverseText;
    }
});