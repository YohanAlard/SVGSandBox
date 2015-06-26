angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {


        $scope.zoomOut = function zoomOut() {
            // $scope.hours.forEach(updateXforZoomOut);
            //d3.selectAll("line").selectAll("x1").call(log)
            ratio = ratioDown;
            //    alert("zoomOut");
            d3.select("#contentSvg").selectAll("line").each(updateX1X2);
            d3.select("#contentSvg").selectAll("text").each(updateX);
            d3.select("#contentSvg").selectAll("path").each(updateD);
            d3.select("#contentSvg").selectAll("rect").each(updateRect);
            d3.select("#contentSvg").selectAll("circle").each(updateCircle);
            //update view box
            var svgContainer = d3.select("#contentSvg").selectAll("#header");
            var previousValue = parseInt(svgContainer.attr("transform").replace("translate(-", "").replace(")"));
            var newValue = previousValue * (1 - ratioUp);
            translateContentGroupXY(newValue, 0, false);
        }
        $scope.zoomIn = function zoomIn() {
            //  $scope.hours.forEach(updateXforZoomIn);
            ratio = ratioUp;
            //  alert("zomm in");
            d3.select("#contentSvg").selectAll("line").each(updateX1X2);
            d3.select("#contentSvg").selectAll("text").each(updateX);
            d3.select("#contentSvg").selectAll("path").each(updateD);
            d3.select("#contentSvg").selectAll("rect").each(updateRect);
            d3.select("#contentSvg").selectAll("circle").each(updateCircle);
            //for	(index = 0; index < $scope.hours.length; index++) {
            var svgContainer = d3.select("#contentSvg").select("g");
            var previousValue = parseInt(svgContainer.attr("transform").replace("translate(-", "").replace(")"));
            var newValue = previousValue * (1 - ratioDown);
            //svgContainer.attr("transform","translate(-"+newValue+")");
            translateContentGroupXY(newValue, 0, false);
            //    var previousViewBox = $('#contentSvg')[0].getAttribute("viewBox").split(" ");
            //    var newX = parseInt(parseInt(previousViewBox[0]) * (1 - ratioDown) + parseInt(previousViewBox[0]));
            //    $('#contentSvg')[0].setAttribute("viewBox", "" + newX + " " + previousViewBox[1] + " " + previousViewBox[2] + " " + previousViewBox[3]);
        };

        $scope.scale = function scale() {
            //  setInterval($scope.zoomIn(),500);
            extController.notify("test");
        }

        drawPancarte($scope);
    })

    .controller('ChatsCtrl', function ($scope) {
        var startDate = new Date();
        var endDate = new Date();
        startDate.clearAfterMinutes();
        endDate.clearAfterMinutes();
        startDate.setDate(startDate.getDate() - 2);
        endDate.setDate(endDate.getDate() + 1);
        identityScale = d3.scale.linear().domain([startDate.getTime(), endDate.getTime()]).range([0, 11520]);
        console.log(startDate.getTime() + " " + endDate.getTime());
        d3.select("#svg").attr("width", identityScale(endDate.getTime()))
        /*   attachPancarteHandler($scope);
         drawHours($scope, startDate, endDate);
         drawNowBar(startDate);*/
        var Yindex = 50;

        drawGraph2("#svg", $scope, startDate, endDate, 0, false, colors[0]);
        Yindex = Yindex + 110;
        popup = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        $scope.update =  function update(){
            var startDate = new Date();
            var endDate = new Date();
            startDate.clearAfterMinutes();
            endDate.clearAfterMinutes();
            startDate.setDate(startDate.getDate()-1);
            endDate.setDate(endDate.getDate() + 1);
            identityScale = d3.scale.linear().domain([startDate.getTime(), endDate.getTime()]).range([0, 11520]);
            $scope.circles.
         console.log("update");
        }
        //  attachHoverOnPoint();
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
