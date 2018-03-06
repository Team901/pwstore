var app1 = angular.module("app1", []);


app1.controller('indexController', function ($http, $scope, $compile) {
    $scope.user = {};




    /*$http({
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
            window.location.href = "/";
        }
    }, function errorCallback(response) {
        // 请求失败执行代码
        var a = response;
    });*/


    //当前用户
    $http({
        method: 'POST',
        url: 'user/getUser',
    }).then(function successCallback(response) {
        $scope.user.name = response.data.name;
        $scope.user.count = response.data.count;
    }, function errorCallback(response) {
        // 请求失败执行代码
    });

    $scope.getApp = function () {
        $http({
            method: 'POST',
            url: '/user/getApp',
        }).then(function successCallback(response) {
            var getApps = []
            for(var i=0;i<response.data.length;i++){
                getApps.push(response.data[i]);
                getApps[i].name = $scope.codesToString(getApps[i].name);
                getApps[i].pw = $scope.codesToString(getApps[i].pw);
            }
            $scope.apps = getApps;
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }

    $scope.showyincao={
        close : true,
        showDiv : function () {
            var span = $('.userName')[0];
            span.style.textDecoration='underline';
            $('.hideDiv').show();
        },
        closeDiv : function(){
            close = true;
            var span = $('.userName')[0];
            span.style.textDecoration='none';
            setTimeout(function () {
                if(close){
                    $('.hideDiv').hide();
                }

            },1000);
        },
        showDivOk:function () {
            close = false;
        }
    };
    $scope.loginout = function () {
        $http({
            method: 'POST',
            url: '/user/loginout',
        }).then(function successCallback(response) {
            window.location.href = '/login.html';
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }


    $scope.action = {
        //翻译
        //str.charCodeAt()
        //String.fromCharCode(code)
        translate:function (str,tra,boo) {
            if(str.trim()=='' || tra.trim()==''){
                return;
            }
            var reStr = '';
            var code1,code2,num;
            for(var i=0;i<str.length;i++){
                code1 = str[i].charCodeAt();
                num = (i+1)%tra.length;
                num = num==0? tra.length-1:num-1;
                code2 = tra[num].charCodeAt();
                if(boo){
                    reStr = reStr + String.fromCharCode(code1+code2);
                }else {
                    reStr = reStr + String.fromCharCode(code1-code2);
                }

            }
            return reStr;
        },
        singleTranslate:function (node,boo) {
            var button = node.target;
            var div = button.parentElement;
            var input = div.getElementsByTagName('input')[0];
            var span = input.previousElementSibling;
            if(input.value.trim()==''){
                return;
            }
            span.innerHTML = $scope.action.translate(span.innerHTML,input.value,boo);
        },
        allTranslate:function (button,boo,id) {
            var input = button.target.parentElement.getElementsByTagName('input')[0];
            if(input.value.trim()==''){
                return;
            }
            $scope.action.sameWay(input,boo,id)
        },
        sameWay:function (input,boo,id) {
            var div = $('#'+id)[0];
            var div_sons = div.children;
            var span;
            for(var i=0; i<div_sons.length; i++){
                span = div_sons[i].getElementsByTagName('span')[1];
                span.innerHTML = $scope.action.translate(span.innerHTML,input.value,boo);

            }
        },
        returnApps:function (event) {
            var button = event.target;
            var div = button.parentElement;
            var inputs = div.getElementsByTagName('input');
            inputs[0].value = '';
            inputs[1].value = '';
            $scope.getApp();
        },
        nameRetrun:function (event,boo) {
            var input = event.target;
            if(input.value.trim()==''){
                return;
            }
            for(var i=0;i<$scope.apps.length;i++){
                $scope.apps[i].name = $scope.action.translate($scope.apps[i].name,input.value,boo);
            }
        },
        modelRetrun:function (event,boo) {
            var input = event.target;
            if(input.value.trim()==''){
                return;
            }
            for(var i=0;i<$scope.modalLg.apps.length;i++){
                $scope.modalLg.apps[i].name = $scope.action.translate($scope.modalLg.apps[i].name,input.value,boo);
            }
        },
        deleteApp:function (event,app) {
            $http({
                method: 'POST',
                url: '/app/deleteApp',
                params: {id:app.id}
            }).then(function successCallback(response) {
                alert("删除成功");
                var button = event.target;
                var div = button.parentElement;
                div.remove();
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }

    };

    $scope.modalLg = {
        apps : [],
        addApp:function () {
            var headDiv = $('.modal-lg .modal-content .headDiv')[0];
            var divs = headDiv.getElementsByClassName('name');
            var input1,input2,input3;
            input1 = divs[0].getElementsByTagName('input')[0];

            if(input1.value.trim()==''){
                input1.focus();
                return;
            }
            input2 = divs[1].getElementsByTagName('input')[0];
            if(input2.value.trim()==''){
                input2.focus();
                return;
            }
            input3 = divs[1].getElementsByTagName('input')[1];
            if(input3.value.trim()==''){
                input3.focus();
                return;
            }

            //密令
            var divMiling = $('.modal-lg .modal-content .modalTranslate')[0];
            var pwStr =divMiling.getElementsByTagName('input')[0].value;
            var nameStr =divMiling.getElementsByTagName('input')[1].value;
            if(input2.value == input3.value){
                if(pwStr.trim()!=''){
                    input2.value = $scope.action.translate(input2.value,pwStr,true);
                }
                if(nameStr.trim()!=''){
                    input1.value = $scope.action.translate(input1.value,nameStr,true);
                }
                $scope.modalLg.apps.push({
                    name:input1.value,
                    pw:input2.value
                });
                input1.value = '';
                input2.value = '';
                input3.value = '';
            }else {
                input2.value = '';
                input3.value = '';
                input2.focus()
            }
        },
        deleteModalApp:function (num) {
            $scope.modalLg.apps.splice(num,1);
        },
        save:function () {
            var params = {
                name:[],
                pw:[]
            };
            var div = $('#mode_apps')[0];
            var spans = div.getElementsByTagName('span');
            if(spans.length==''){
                return;
            }
            for(var i=0;i<spans.length;i++){
                if(spans[i].innerHTML.trim()==''||spans[i+1].innerHTML.trim()==''){
                    break;
                }
                params.name.push($scope.stringToCodes(spans[i].innerHTML));
                params.pw.push($scope.stringToCodes(spans[i+1].innerHTML));
                i=i+1;
            }
            if(params.name.length==0){
                return;
            }

            $http({
                method: 'POST',
                url: '/app/saveApps',
                params: {name:params.name.toString(),pw:params.pw.toString()}
            }).then(function successCallback(response) {
                if(response.data.length>0){
                    $scope.modalLg.apps = [];
                    alert("成功添加"+response.data.length+"个app");
                }else {
                    alert("保存失败");
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
                var a = '';
            });
        }
    };
    //str.charCodeAt()
    //String.fromCharCode(code)
    $scope.codesToString = function(codesString){
        var codes = codesString.split("s");
        var reStr = String.fromCharCode(codes[0]);
        for(var i=1;i<codes.length;i++){
            reStr = reStr + String.fromCharCode(codes[i]);
        }
        return reStr;
    }
    $scope.stringToCodes = function(Str){
        var codes = [];
        for(var i=0;i<Str.length;i++){
            codes.push(Str[i].charCodeAt());
        }
        return codes.toString().replace(/,/g,"s");
    }
    $scope.getApp();
});