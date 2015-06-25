angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {


        $scope.zoomOut = function zoomOut() {
           // $scope.hours.forEach(updateXforZoomOut);
            //d3.selectAll("line").selectAll("x1").call(log)
           ratio = ratioDown;
            alert("zoomOut");
            d3.select("#contentSvg").selectAll("line").each(updateX1X2);
            d3.select("#contentSvg").selectAll("text").each(updateX);
            d3.select("#contentSvg").selectAll("path").each(updateD);
            d3.select("#contentSvg").selectAll("rect").each(updateRect);
            d3.select("#contentSvg").selectAll("circle").each(updateCircle);
            //update view box
                   var svgContainer = d3.select("#contentSvg").selectAll("#header");
                    var previousValue = parseInt(svgContainer.attr("transform").replace("translate(-","").replace(")"));
                    var newValue =   previousValue * (1 - ratioUp);
                    translateContentGroupXY(newValue,0,false);
        }
        $scope.zoomIn = function zoomIn() {
          //  $scope.hours.forEach(updateXforZoomIn);
            ratio = ratioUp;
            alert("zomm in");
            d3.select("#contentSvg").selectAll("line").each(updateX1X2);
            d3.select("#contentSvg").selectAll("text").each(updateX);
            d3.select("#contentSvg").selectAll("path").each(updateD);
            d3.select("#contentSvg").selectAll("rect").each(updateRect);
            d3.select("#contentSvg").selectAll("circle").each(updateCircle);
            //for	(index = 0; index < $scope.hours.length; index++) {
              var svgContainer = d3.select("#contentSvg").select("g");
                                var previousValue = parseInt(svgContainer.attr("transform").replace("translate(-","").replace(")"));
                                var newValue =  previousValue * (1 - ratioDown);
                                //svgContainer.attr("transform","translate(-"+newValue+")");
                                 translateContentGroupXY(newValue,0,false);
        //    var previousViewBox = $('#contentSvg')[0].getAttribute("viewBox").split(" ");
        //    var newX = parseInt(parseInt(previousViewBox[0]) * (1 - ratioDown) + parseInt(previousViewBox[0]));
        //    $('#contentSvg')[0].setAttribute("viewBox", "" + newX + " " + previousViewBox[1] + " " + previousViewBox[2] + " " + previousViewBox[3]);
        };

        $scope.scale = function scale(){
              //  setInterval($scope.zoomIn(),500);
            extController.notify("test");
        }

        drawPancarte($scope);
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
