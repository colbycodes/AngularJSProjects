var myAngularApp = angular.module('myAngularApp', ['ngRoute', 'ngAnimate']);

myAngularApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'ExampleController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'ExampleController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

myAngularApp.directive('randomNinja', [function(){
    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: "="
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);

myAngularApp.controller('ExampleController', ['$scope', '$http', function($scope, $http){

    $scope.newNinja = {};

    $scope.removeNinja = function(ninja){
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.removeAllNinjas = function(){
        $scope.ninjas = [];
    };

    $http.get('data/ninja.json').then(function(response){
        $scope.ninjas = response.data;
    });

    $scope.addNinja = function(){
        console.log("adding new ninja");
        $scope.ninjas.push({
            name: $scope.newNinja.name,
            belt: $scope.newNinja.belt,
            rate: $scope.newNinja.rate,
            available: true,
            thumb: "content/imgs/default.png"
        });
        $scope.newNinja = {};
        console.log("ninjas length: " + $scope.ninjas.length);
    };
}]);
