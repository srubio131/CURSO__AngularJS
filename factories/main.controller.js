var app = angular.module("TodoList",["LocalStorageModule"]);

// Factories
app.factory("ToDoService", ["localStorageService", function(localStorageService){

    return (function(){

        // Private atributes
        var key = "angular-todolist";
        // Recuperar lista todos del storage
        var tareas = [];
        if (localStorageService.get(key)) {
            tareas = localStorageService.get(key);
        }

        // Private methods
        var updateLocalStorage = function() {
            localStorageService.set(key, tareas);
        };

        // Public methods
        return {
            clean: function() {
                tareas = [];
                updateLocalStorage();
                return tareas;
            },
            addTarea: function(nuevaTarea) {
                tareas.push(nuevaTarea);
                updateLocalStorage();
                return tareas;
            },
            removeItem: function (item) {
                tareas = tareas.filter(function(tarea){
                    return tarea !== item;
                });
                updateLocalStorage();
                return tareas;
            },
            getTareas: function () {
                return tareas;
            }
        };
    })();
}]);

// Controladores
app.controller("MainCtrl", ["$scope","ToDoService", function ($scope,ToDoService) {

    $scope.todos = ToDoService.getTareas();
    
    $scope.addTarea = function (nuevaTarea) {
        $scope.todos = ToDoService.addTarea(nuevaTarea);
        $scope.nuevaTarea = {};
    };

    $scope.clean = function () {
        $scope.todos = ToDoService.clean();
    };

    $scope.removeItem = function (item) {
        $scope.todos = ToDoService.removeItem(item);
    };

}]);

// Filtros
app.filter("reverse", function() {
    return function (text, isUpperCase) {
        var reverseText = text.split("").reverse().join("");
        return isUpperCase ? reverseText.toUpperCase() : reverseText;
    }
});