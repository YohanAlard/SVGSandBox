angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        drawPancarte();

        $scope.zoomIn =function zoomIn(){
               console.log("ZI" +$('#contentSvg')[0].getAttribute("viewBox"));
               var previousViewBox = $('#contentSvg')[0].getAttribute("viewBox").split(" ");
               var newWidth = parseInt(parseInt(previousViewBox[2]) * 0.9);
               console.log(newWidth);
               var newX = parseInt(previousViewBox[0]) + parseInt(previousViewBox[2]) * 0.05;
               console.log(newX);
               $('#contentSvg')[0].setAttribute("viewBox", "" + newX + " " +
                            previousViewBox[1]+" " + newWidth +" "+ previousViewBox[3]);
               console.log("ZI E" +$('#contentSvg')[0].getAttribute("viewBox"));


        }
        $scope.zoomOut =function zoomIn(){
               console.log("ZO");

        }
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
