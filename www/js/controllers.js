var forms = [];
var url = "example";
var beta = false;
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, formService, $localStorage) {
    this.submit = function(form) {
        var data = JSON.parse(JSON.stringify(form));
        forms.push(data);
        formService.send(forms, url);
        $scope.forms = forms;
        $scope.$storage = $localStorage.form = forms;
        
    }
    this.clear = function(){
        forms.splice(0, forms.length);

    }
    this.resend = function(){
        formService.send(forms, url);
    }

    $scope.$on('$ionicView.enter', function(e) {
        if ($localStorage.form != null) {
            forms = $localStorage.form;
        }
        if ($localStorage.url != null) {
            url = $localStorage.url;
        }
        $scope.forms = forms;
    });
})

.controller('ChatsCtrl', function($scope, Chats, getData) {
    $scope.$on('$ionicView.enter', function(e) {
        $scope.records = getData.get(url);
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $localStorage, $ionicPopup, $http) {
    $scope.updateUrl = function(url2) {

        url = url2;
        $localStorage.url = url2;
        $http.get(url2 + "/ping").
        success(function(data, status, headers, config) {
            if (data == "pong") {
                $ionicPopup.alert({
                    title: 'URL set',
                    template: "New url is " + url2,
                })

            };
        }).
        error(function(data, status, headers, config) {
            $ionicPopup.alert({
                title: ':(',
                template: "That url is not valid",
            })
        });

    }

});
