var app = angular.module("TodoList",["LocalStorageModule"]);

// Factories
app.service("ToDoService", ["localStorageService", function(localStorageService){

    this.key = "angular-todolist";
    this.tareas = [];
    if (localStorageService.get(this.key)) {
        this.tareas = localStorageService.get(this.key);
    }

    this.updateLocalStorage = function() {
        localStorageService.set(this.key, this.tareas);
    };
    this.clean = function() {
        this.tareas = [];
        this.updateLocalStorage();
        return this.tareas;
    };
    this.addTarea = function(nuevaTarea) {
        this.tareas.push(nuevaTarea);
        this.updateLocalStorage();
        return this.tareas;
    };
    this.removeItem = function (item) {
        this.tareas = this.tareas.filter(function(tarea){
            return tarea !== item;
        });
        this.updateLocalStorage();
        return this.tareas;
    };
    this.getTareas = function () {
        return this.tareas;
    };
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