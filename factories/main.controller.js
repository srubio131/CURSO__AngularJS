var app = angular.module("TodoList",["LocalStorageModule"]);

// Factories
app.factory("ToDoService", ["localStorageService", function(localStorageService){
    var toDoService = {};

    toDoService.key = "angular-todolist";
    // Recuperar lista todos del storage
    if (localStorageService.get(toDoService.key)) {
        toDoService.tareas = localStorageService.get(toDoService.key);
    } else {
        toDoService.tareas = [];
    }

    // Funciones
    toDoService.clean = function() {
        toDoService.tareas = [];
        toDoService.updateLocalStorage();
        return toDoService.getAll();
    };

    toDoService.addTarea = function(nuevaTarea) {
        toDoService.tareas.push(nuevaTarea);
        toDoService.updateLocalStorage();
        return toDoService.getAll();
    };

    toDoService.updateLocalStorage = function() {
        localStorageService.set(toDoService.key, toDoService.tareas);
    };

    toDoService.getAll = function () {
        return toDoService.tareas;
    };

    toDoService.removeItem = function (item) {
        toDoService.tareas = toDoService.tareas.filter(function(tarea){
            return tarea !== item;
        });
        toDoService.updateLocalStorage();
        return toDoService.getAll();
    };

    return toDoService;
}]);

// Controladores
app.controller("MainCtrl", ["$scope","ToDoService", function ($scope,ToDoService) {

    $scope.todos = ToDoService.getAll();
    
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