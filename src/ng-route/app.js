// Identificador y array de módulos para registrarlos en la app (ngResource:consumir api rest)
var app = angular.module("CursoAngularJS",['restangular','ngRoute']);

// Constants
app.constant('APIGITHUB', (function() {
    var baseUrl = "https://api.github.com/";
    var user = "srubio131";
    return {
        BASEURL: "https://api.github.com/",
        USER: baseUrl + "users/" + user + "/",
        USERREPOS: baseUrl + "repos/" + user + "/"
    }
})());

// Values
app.value("cssCircular", {
    'border-radius': '50%',
    'width': '100px',
    'height': '100px',
    'display': 'inline-block'
});

app.config(function($routeProvider) {
   $routeProvider
       .when("/",{
            controller: "MainCtrl",
            templateUrl: "templates/home.html"
        })
       .when("/repo/:name",{
            controller: "RepoCtrl",
            templateUrl: "templates/repo.html"
       })
       .otherwise("/");
});


