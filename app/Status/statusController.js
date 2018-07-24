'use strict';

angular.module('statusController', [])
    .controller("StatusCtrl", ['$scope', '$http', '$interval', function ($scope, $http, $interval){
        $scope.testing = "MyTest1";

    }]);