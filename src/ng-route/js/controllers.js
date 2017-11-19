var app = angular.module("CursoAngularJS");

// Controladores
app.controller("MainCtrl", ["$scope", "Restangular", "APIGITHUB",  function ($scope,Restangular,APIGITHUB) {

    // Set baseUrl api github
    Restangular.setBaseUrl(APIGITHUB.USER);

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

app.controller("RepoCtrl", ["$scope", "$routeParams", "Restangular", "APIGITHUB",  function ($scope,$routeParams,Restangular,APIGITHUB) {

    // Set baseUrl api github
    Restangular.setBaseUrl(APIGITHUB.USERREPOS);

    // Get all repos
    $scope.repo = {};
    Restangular.one($routeParams.name).get().then(function(repo){
        $scope.repo = repo;
    }).catch(function (error) {
        console.error("Error get!! - ", error);
    });

}]);