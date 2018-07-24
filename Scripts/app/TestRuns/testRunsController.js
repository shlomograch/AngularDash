'use strict';

angular.module('testRunsController', [])
    .controller("TestRunsCtrl",
    [
        '$scope', '$http', '$interval', '$window', function ($scope, $http, $interval, $window) {
            $scope.numTestRuns = 10;
            $scope.selectedTestRun;
            $scope.getTestResultsCsv = [];
            $scope.fileName = "InvalidName";

            console.log($window.localStorage);

            $http.get("http://api.autodash.nelnet.net/api/GetTestRuns/" + $scope.numTestRuns)
                .then(function (response) {
                    $scope.testRuns = response.data;
                    var today = new Date();
                    $scope.today = today;
                    console.log('Fetched data!');
                });

            $interval(function () {
                $http.get("http://api.autodash.nelnet.net/api/GetTestRuns/" + $scope.numTestRuns)
                    .then(function (response) {
                        $scope.testRuns = response.data;
                        var today = new Date();
                        $scope.today = today;
                        console.log('Fetched data!');
                    });
            }, 5000);

            $scope.GetCsv = function (testRunKey) {
                $scope.selectedTestRun = testRunKey;
                $scope.getTestResultsCsv = [];
                $http.get("http://api.autodash.nelnet.net/api/GetTestResults/" + testRunKey)
                    .then(function (response) {
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.getTestResultsCsv.push(
                                {
                                    Expected: response.data[i].Expected,
                                    Actual: response.data[i].Actual,
                                    ResultStatus: response.data[i].ResultStatus
                                }
                            );
                        }

                        $scope.testResults = response.data;
                    });
            };

            $scope.GetTestRuns = function (formData) {
                $http.get("http://api.autodash.nelnet.net/api/GetTestRuns/" + $scope.numTestRuns)
                    .then(function (response) {
                        $scope.testRuns = response.data;
                    });
            };

            $scope.GetFileName = function (testRunKey) {
                var testRun = $scope.testRuns.find(x => x.TestRunKey === testRunKey);
                var myDate = new Date(testRun.StartDateTime), locale = "en-us";
                var fileName = testRun.TestName +
                    '_' +
                    myDate.toLocaleString(locale, { month: "long" }) +
                    ' ' +
                    myDate.getDay() +
                    ' ' +
                    myDate.getFullYear() +
                    '_' +
                    myDate.toLocaleTimeString().replace(':', '-').replace(':', '-') +
                    '_' +
                    testRunKey;

                return fileName;
            }

            $scope.GetTestResults = function (testRunKey) {
                $scope.getTestResultsCsv = [];
                $scope.fileName = $scope.GetFileName(testRunKey);


                $http.get("http://api.autodash.nelnet.net/api/GetTestResults/" + testRunKey)
                    .then(function (response) {
                        $scope.testResults = response.data;
                        $scope.selectedTestRun = testRunKey;

                        for (var i = 0; i < response.data.length; i++) {
                            $scope.getTestResultsCsv.push(
                                {
                                    Expected: response.data[i].Expected,
                                    Actual: response.data[i].Actual,
                                    ResultStatus: response.data[i].ResultStatus
                                }
                            );
                        }
                    });
            };
        }
    ]);