var app = angular.module("app", []);


app.controller('loginController', function ($http, $scope) {
    $scope.loginOnkey=function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login();
        }
    };

    /*$http({
        url: 'sss',           //请求的url路径
        method: 'POST',    //GET/DELETE/HEAD/JSONP/POST/PUT
        params: {a:'s'},   //转为  ?param1=xx1&param2=xx2的形式
        data: {b:'s'}        //包含了将被当做消息体发送给服务器的数据，通常在POST请求时使用
    }).success(function (response, status, header, config, statusText) {
        //成功处理
        console.log('s');
    }).error(function (data, header, config, status) {
        //错误处理
        console.log('e');
    });*/

    $scope.login = function () {
        $http({
            method: 'POST',
            url: 'user/login',
            params: $scope.user
            // data: $scope.user
        }).then(function successCallback(response) {
            if(response.data.length == 0){
                $('#loginname').val("");
                $('#password').val("");
                $(".errorNameOrPassword").show();
                setTimeout(function () {
                    $(".errorNameOrPassword").hide();
                },300);
                document.getElementById('loginname').focus();
            }else {
                window.location.href = "/index.html";
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
            var a = response;
        });
    }
});