'use strict';

angular.module('executionController', [])
    .controller("ExecutionCtrl", [
        '$scope', '$http', '$interval', '$rootScope', function ($scope, $http, $interval, $rootScope) {

            $scope.findApplication;
            $scope.findTestName;
            $scope.environmentName;
            $scope.stackTrace = false;
            $scope.consoleLog = false;
            $scope.utilization = false;
            $scope.scheduled = false;
            $scope.runAllTests;
            $scope.runGui;
            $scope.runApi;
            $scope.findTestName = "Selected Tests";

            $scope.todayDate = new Date('');
            // | date:'MMMM dd hh:mm a'

            $scope.currentUser = $rootScope.currentUser;
            console.log($scope.currentUser);


            $http.get("http://api.autodash.nelnet.net/api/GetApps")
                .then(function (response) {
                    $scope.findApplications = response.data;
                });

            $scope.GetTestData = function (formData) {
                if ($scope.findApplication != null) {
                    $http.get("http://api.autodash.nelnet.net/api/GetTests/" + $scope.findApplication.ApplicationName)//, { 'appName': $scope.findApplication.ApplicationName })
                        .then(function (response) {
                            $scope.findTests = response.data;
                        });
                    $http.get("http://api.autodash.nelnet.net/api/GetEnvironments/" + $scope.findApplication.ApplicationName)//, { 'appName': $scope.findApplication.ApplicationName })
                        .then(function (response) {
                            $scope.getEnvironments = response.data;
                        });
                }
            };

            $http.get("http://api.autodash.nelnet.net/api/GetQueuedTests")
                .then(function (response) {
                    $scope.queuedTests = response.data;
                    console.log('Fetched current queue!');
                });

            $interval(function () {
                $http.get("http://api.autodash.nelnet.net/api/GetQueuedTests")
                    .then(function (response) {
                        $scope.queuedTests = response.data;
                        console.log('Fetched current queue!');
                    });
            }, 5000);

            $scope.submitApplication = function (formData) {

                var myDate = new Date();

                if ($scope.todayDate == null || $scope.todayDate == 'undefined' || $scope.todayDate == 'Invalid Date') {
                    $scope.myDateObj = myDate.getMonth() + 1 + '/' + myDate.getDate() + '/' + myDate.getFullYear();
                }
                else {
                    var mins = ('0' + $scope.todayDate.getMinutes()).slice(-2);
                    $scope.myDateObj = $scope.todayDate.getMonth() + 1 + '/' + $scope.todayDate.getDate() + '/' + $scope.todayDate.getFullYear() + ' ' + $scope.todayDate.getHours() + ':' + mins;
                }

                $http({
                    method: 'POST',
                    url: 'http://api.autodash.nelnet.net/api/AddToQueue',
                    data: "={'TestName': '" + $scope.findTestName.TestName + "','ApplicationName': '" + $scope.findApplication.ApplicationName + "','UserName': '" + $scope.currentUser + "','StackTrace': '" + $scope.stackTrace + "'" +
                    ",'ConsoleLog': '" + $scope.consoleLog + "','Utilization': '" + $scope.utilization + "','QueuedDateTime': '" + $scope.myDateObj + "','Environment': '" + $scope.environmentName.Environment + "','RunAllApi': '" + $scope.runGui + "','RunAllGui': '" + $scope.runApi + "'}",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (response) {
                    $.notify({
                        // options
                        message: 'Succesfully added ' + $scope.findTestName.TestName + ' to Queue'
                    }, {
                            // settings
                            type: 'success'
                        });

                    // Reset data for next run.
                    $scope.findApplication = null;
                    $scope.findTestName = "Selected Tests";
                    $scope.stackTrace = false;
                    $scope.consoleLog = false;
                    $scope.utilization = false;
                    $scope.scheduled = false;
                    $scope.todayDate = null;
                    $scope.runAllTests = null;
                    $scope.runGui = false;
                    $scope.runApi = false;
                },
                    function (response) { // optional
                        $.notify({
                            // options
                            message: 'Failed to add ' + $scope.findTestName.TestName + ' to queue'
                        }, {
                                // settings
                                type: 'danger'
                            });
                    });
            };

        }
    ]);