angular.module('starter.services', [])

.factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .service('formService', function($http, Papa, $ionicPopup, getData) {
        this.send = function(form, url) {
            var a = 0;


            temp = Papa.unparse(form);

            temp = temp.substring(temp.indexOf("\n") + 1);



            //^ Removes the first line, which has stupid header info }

            temp = temp + "\n";
            //Adds the newline, so that csv looks nice

            console.log();
            console.log(temp);

            $http.post(url + "/api", {

                data: temp,

            }).
            success(function(data, status, headers, config) {
                form.splice(0, form.length);
                a++
                if (a == 1) {
                    $ionicPopup.alert({
                        title: 'It worked!',
                        template: 'I am just as suprised as you are...'
                    })
                };


            }).
            error(function(data, status, headers, config) {
                a++
                if (a == 1) {
                    var errorMsg = 'Didn\'t send that time. Will try to send next submit. Please contact someone in charge if this continues to happen.'
                    if (url == "example") {
                        errorMsg = 'Did you enter in the correct url?'
                    }
                    $ionicPopup.alert({
                        title: ':(',
                        template: errorMsg,
                    });
                }
            });


        }



    }).service('getData', function($http, Papa) {
        var returnValue
        this.get = function(url) {
            $http.get(url + '/data').
            success(function(data, status, headers, config) {
                jsonData = Papa.parse(data, {
                    header: true,
                    dynamicTyping: true,
                    newline: "\n",
                })
                returnValue = jsonData
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
            return returnValue;
        }



    });
