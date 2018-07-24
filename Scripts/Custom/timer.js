(function () {
    // Defining a connection to the server hub.
    var myHub = $.connection.myHub;
    // Setting logging to true so that we can see whats happening in the browser console log. [OPTIONAL]
    $.connection.hub.logging = true;
    // Start the hub
    $.connection.hub.start();

    // This is the client method which is being called inside the MyHub constructor method every 3 seconds
    //myHub.client.SendServerTime = function (serverTime) {
    //    // Set the received serverTime in the span to show in browser
    //    $("#newTime").text(serverTime);
    //};

    var currentTestRunKey = "";
    myHub.client.SendServerTime = function deserialize(serverTime) {
        var table = document.getElementById("dynamicTable");

        if (currentTestRunKey !== serverTime[0].TestRunKey) {
            $("#dynamicTable tbody").empty();
            $('#mySpinner').removeClass('spinner');
        }

        for (var i = 0; i < serverTime.length; i++) {

            if (currentTestRunKey === serverTime[0].TestRunKey) {
                break;
            }
            var row = table.insertRow(i);
            row.id = serverTime[i].TestRunKey;

            var myDate = new Date(serverTime[i].StartDateTime);

            var newDate = "";
            var today = new Date();

            if (today.getUTCDate() === myDate.getUTCDate()) {
                newDate = myDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
            else {
                newDate = (myDate.getMonth() + 1) + "-" + myDate.getDate() + "-" + myDate.getFullYear() + " " + myDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }


            row.innerHTML = "<button type='button' class='btn btn-large btn-block btn-outline-" + serverTime[i].TestRunStatus.toLowerCase() + "' onclick='OpenResults(" + serverTime[i].TestRunKey + ")'>" +
                "<div class='col-md-12'>" +
                "<div class='row'>" +
                "<div class='col-md-11'>" +
                serverTime[i].TestName + 
                "</div>" +
                "<div class='col-md-1'>" +
                "<div class='pull-right badge badge-pill badge-" + serverTime[i].TestRunStatus.toLowerCase() + " '>" + serverTime[i].TestRunStatus + "</div>" +
                "</div>" +
                "</div>" +
                "<div class='row'>" +
                serverTime[i].ExecutedBy +
                "</div>" +
                "<div class='row'>" +
                newDate +
                "</div>" +
                "</div>" +
                "</button> <br>";
            //row.innerHTML =
            //    "<td>" +
            //        "<div class='row' onclick='OpenResults(" + serverTime[i].TestRunKey + ")' style='border-radius:25px;'>" +
            //            "<div class='col-sm-12' >" +
            //                "<div class='pull-left col-sm-2 iconContainer'>" +
            //                "<div class='fa fa-pass fa-3x'></div>" +
            //                "</div>" +
            //                "<div class='pull-right col-sm-10 border'>" +
            //                "<h4 class='row feature-heading'>" +serverTime[i].TestName + "</h4>" +
            //                "<div class='row'>" +
            //                "<div class='col-sm-4'>" +
            //                "<div class='fa fa-user-o'> " + serverTime[i].ExecutedBy + "</div>" +
            //                "</div>" +
            //                "<div class='col-sm-7'>" +
            //                "<div class='fa fa-calendar'> " + serverTime[i].StartDateTime +"</div>" +
            //                "</div>" +

            //                "</div>" +
            //                "</div>" +
            //            "</div>" +
            //        "</div>" +
            //    "</td>";
        }
        currentTestRunKey = serverTime[0].TestRunKey;
    };

    // Client method to broadcast the message
    myHub.client.hello = function (message) {
        var textToSend = document.getElementById("messageArea");
        $.notify(textToSend.value);

        myHub.server.sendMessageToClients(textToSend.value);

        //$("#message").text(message);
        //$("#message").notify("Hello World!");
    };

    //Button click jquery handler
    $("#btnClick").click(function () {
        //myHub.server.sendMessage($("#messageArea").value);
        // Call SignalR hub method
        //myHub.server.hello();
        myHub.server.hello();
    });

}());





(function (document) {
    'use strict';

    var LightTableFilter = (function (Arr) {

        var _input;


        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function (table) {
                Arr.forEach.call(table.tBodies, function (tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }
        function _filter(row) {

            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';

        }
        return {
            init: function () {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function (input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            LightTableFilter.init();
        }
    });

})(document);


function OpenResults(testRunKey) {
    //alert(testRunKey);
    $('#secondSpinner').addClass('spinner');
    $.ajax({
        type: "POST",
        url: "/Home/Test",
        data: { testRunKey: testRunKey },
        dataType: "json",

        success: function (resp) {

            $('#secondSpinner').removeClass('spinner');
            var resultsTable = document.getElementById("TestResultDetails");

            resultsTable.innerHTML = "" +
                "<thead>" +
                "<tr>" +
                "<td>Status</td>" +
                "<td>Expected</td>" +
                "<td>Actual</td>" +
                "</tr>" +
                "</thead>" +
                "<tbody>";
            for (var i = 0; i < resp.length; i++) {
                resultsTable.innerHTML +=
                    "<tr>" +
                    "<td><i class='fa fa-" + resp[i].ResultStatus.toLowerCase() + "'></i></td>" +
                    "<td>" + resp[i].Expected + "</td>" +
                    "<td><code>" + resp[i].Actual + "</code></td>" +
                    "</tr>";

            }
            resultsTable.innerHTML += "</tbody>";


        },
        error: function () {
            alert("Something brokeded");
        }
    });
};
