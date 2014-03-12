var app = angular.module('chatApp', []);

app.factory('socket', function(){
    return io.connect('http://134.84.56.244:4444');
});

app.controller('ChatCtrl', function($scope, socket)
{
    $scope.msgs = [];
    $scope.username = "none";

    $scope.sendMsg = function() {
        socket.emit('send msg', $scope.username+': '+$scope.chat.msg);
     //   alert($scope.chat.msg);
        $scope.chat.msg = '';
    };

    socket.on('get msg', function(data) {
        $scope.msgs.push(data);
        $scope.$digest();
    });

    socket.on('apiCalled', function(data) {
        $scope.msgs.push(data);
        console.log("API CALLED="+data);
      //  alert(data);
        $scope.$digest();
    });
});