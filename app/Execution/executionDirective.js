'use strict';

angular.module('executionDirective', [])
    .directive('executionDirective',
        function () {
            var directive = {};
            directive.restrict = 'AE';
            directive.transclude = false;
            directive.templateUrl = "Scripts/app/Execution/partialExecution.html";
            return directive;
        });