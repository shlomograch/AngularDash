'use strict';

angular.module('statusDirective', [])
    .directive('statusDirective',
    function () {
        var directive = {};
        directive.restrict = 'AE';
        directive.transclude = false;
        directive.templateUrl = "Scripts/app/Status/partialStatus.html";
        return directive;
    });