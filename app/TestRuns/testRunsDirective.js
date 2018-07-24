'use strict';

angular.module('testRunsDirective', [])
    .directive('testRunsDirective',
    function () {
        var directive = {};
        directive.restrict = 'AE';
        directive.transclude = false;
        directive.templateUrl = "Scripts/app/TestRuns/partialTestRuns.html";
        return directive;
    });