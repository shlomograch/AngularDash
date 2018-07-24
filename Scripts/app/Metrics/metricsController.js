'use strict';
angular.module('metricsController', []).controller("MetricsCtrl",
    [
        '$scope', '$http', '$interval', '$rootScope', '$window', function ($scope, $http, $interval, $rootScope, $window) {

            $scope.daysBack;
            $scope.findApplication;
            $scope.currentUser = '@ViewBag.CurrentUser';
            $scope.environmentName;
            $scope.applicationName = "FMWEB";

            if (($window.localStorage.getItem('appName') !== null &&
                $window.localStorage.getItem('appName') !== 'undefined') &&
                ($window.localStorage.getItem('envName') !== null &&
                    $window.localStorage.getItem('envName') !== 'undefined') &&
                ($window.localStorage.getItem('startDateFilter') !== null &&
                    $window.localStorage.getItem('startDateFilter') !== 'undefined') &&
                ($window.localStorage.getItem('endDateFilter') !== null &&
                    $window.localStorage.getItem('endDateFilter') !== 'undefined')) {



            }

            $http.get("http://api.autodash.nelnet.net/api/GetApps")
                .then(function (response) {
                    $scope.findApplicationsList = response.data;
                });

            $scope.GetTestData = function () {
                if ($scope.findApplication != null) {
                    $http.get("http://api.autodash.nelnet.net/api/GetEnvironments/" + $scope.findApplication.ApplicationName)
                        .then(function (response) {
                            $scope.getEnvironmentsList = response.data;
                            var newObject = {};
                            newObject.Environment = "ALL";
                            $scope.getEnvironmentsList.push(newObject);
                        });
                }
            };


            $scope.changedValueStart = function (item) {
                $scope.startDateFilter = (item.getMonth() + 1) + '-' + item.getDate() + '-' + item.getFullYear();
            }
            $scope.changedValueEnd = function (item) {
                $scope.endDateFilter = (item.getMonth() + 1) + '-' + item.getDate() + '-' + item.getFullYear();
            }


            $scope.GetMetrics = function () {
                var elmnt = document.getElementById("quickStats");
                elmnt.scrollIntoView();


                $http.get("http://api.autodash.nelnet.net/api/VTestRunResults/" +
                    $scope.findApplication.ApplicationName +
                    "/" +
                    $scope.environmentName.Environment +
                    "/" +
                    this.startDateFilter +
                    "/" +
                    $scope.endDateFilter)
                    .then(function (response) {
                        $scope.VTestRunResults = response.data.TestRunResults;

                        $scope.amountTestsPass = response.data.AmountPass;
                        $scope.amountTestsFail = response.data.AmountFail;

                        $scope.favEnviroment = response.data.EnviromentNameAndCount;

                        $scope.testNameAndCount = response.data.TestNameAndCount;

                        $scope.testNameAndFailCount = response.data.TestNameAndFailCount;

                        $scope.GuiAPiTOtal = response.data.AmountGUI + response.data.AmountAPI;
                        $scope.amountTestsGUI = Math.round((response.data.AmountGUI / $scope.GuiAPiTOtal) * 100);
                        $scope.amountTestsAPI = Math.round((response.data.AmountAPI / $scope.GuiAPiTOtal) * 100);

                        $scope.total = response.data.AmountPass +
                            response.data.AmountFail;
                        $scope.TestPassPre = Math.round(($scope.amountTestsPass / $scope.total) * 100);
                        $scope.TestFailPre = Math.round(($scope.amountTestsFail / $scope.total) * 100);
                        $scope.testers = response.data.UserNameAndCount;

                        ///////////////////////////////////////////Pie Chart///////////////////////////////////////////
                        var TestetChart = document.getElementById('TestetChart').getContext('2d');
                        if (window.doughnut != undefined)
                            window.doughnut.destroy();
                        window.doughnut = new Chart(TestetChart,
                            {
                                type: 'doughnut',
                                data: {
                                    labels: [],
                                    datasets: [
                                        {
                                            backgroundColor: [],
                                            borderColor: 'rgb(255, 255, 255)',
                                            data: []
                                        }
                                    ]
                                },
                                options: { legend: { display: false } }
                            }
                        );
                        $scope.myColors = [];
                        Object.keys($scope.testers).forEach(function (key) {
                            var value = $scope.testers[key];
                            window.doughnut.data.labels.push(key);
                            window.doughnut.data.datasets[0].data.push(value);
                            var myColor = getRandomColor();
                            $scope.myColors.push(myColor);
                            window.doughnut.data.datasets[0].backgroundColor.push(myColor);
                        });
                        window.doughnut.update();
                        console.log("PieChart is rendered");
                        ///////////////////////////////////////////End Pie Chart///////////////////////////////////////////

                        ///////////////////////////////////////////Fav Enviroment Chart///////////////////////////////////
                        var values = [];
                        var total = 0;
                        Object.keys($scope.favEnviroment)
                            .forEach(function (key) {
                                values = $scope.favEnviroment[key];
                                total += $scope.favEnviroment[key];
                            });
                        $scope.enviromentTotal = total;
                        ///////////////////////////////////////////End Fav Enviroment Chart/////////////////////////////
                        //                         ______.........--=T=--.........______
                        //                                          :|:
                        //                      :-.              /""""""\
                        //                      ': '-._____..--""(""""""()`---.__
                        //                        /:   _.._vr_''   ":""""'[] |""`\\
                        //                        ': :'     `-.    _:._      '"""" :
                        //                          ::          '--=:____:.___....-"
                        //                                           0"       O" 
                        ///////////////////////////////////////////Line Chart///////////////////////////////////////////
                        if (window.lineChart != undefined)
                            window.lineChart.destroy();
                        var lineChartO = document.getElementById('chartContainer').getContext('2d');
                        $scope.Dtdate = response.data.DtPrecent;
                        Chart.defaults.global.defaultFontFamily = "Lato";
                        Chart.defaults.global.defaultFontSize = 16;

                        var speedData = { datasets: [{ label: "Enviroment:" + $scope.environmentName.Environment }] };

                        var chartOptions = {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    boxWidth: 50,
                                    fontColor: 'black',
                                }
                            }
                        };

                        window.lineChart = new Chart(lineChartO, {
                            type: 'line',
                            data: speedData,
                            options: chartOptions
                        });
                        Object.keys($scope.Dtdate).forEach(function (key) {
                            var value = $scope.Dtdate[key];
                            window.lineChart.data.labels.push(key);
                            window.lineChart.data.datasets[0].data.push(value);
                        });
                        window.lineChart.update();
                        console.log("LineChart is rendered");
                        ///////////////////////////////////////////End Line Chart///////////////////////////////////////////
                    });

                $http.get("http://api.autodash.nelnet.net/api/GetExecutedTests/"
                    + $scope.findApplication.ApplicationName
                    +
                    "/"
                    +
                    $scope.environmentName.Environment)
                    .then(function (response) {
                        $scope.ranTests = response.data;
                        $scope.notExecuted = Math.round((response.data.NotExecuted /
                            (response.data.NotExecuted + response.data.Executed)) *
                            100);
                        $scope.executed = Math.round((response.data.Executed /
                            (response.data.NotExecuted + response.data.Executed)) *
                            100);
                    });
            };

            function getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        }
    ]);


