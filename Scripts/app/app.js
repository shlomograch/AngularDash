var window;
window.$ = window.jQuery = $;

var app = angular.module('autoDashApp',
    [
        //'ngRoute',
        'testRunsModule',
        'executionModule',
        'metricsModule',
        'statusModule',
        //'testFiltersModule',
        'ngSanitize',
        'ngCsv',
        'ngMaterial',
        'ngAnimate'
        
    ]);

app.run(function ($rootScope) {
    $rootScope.currentUser = 'No User Found';
});
