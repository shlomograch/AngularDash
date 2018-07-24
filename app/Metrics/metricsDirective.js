'use strict';

angular.module('metricsDirective', [])
    .directive('metricsDirective',
        function () {
            var directive = {};
            directive.restrict = 'AE';
            directive.transclude = false;
            directive.templateUrl = "Scripts/app/Metrics/partialMetrics.html";
            return directive;
        });