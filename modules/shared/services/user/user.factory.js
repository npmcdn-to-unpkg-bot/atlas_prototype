(function() {
    'use strict';

    angular
        .module('dpShared')
        .service('user', userFactory);

    userFactory.$inject = ['$http', '$httpParamSerializer', 'environment', 'CLIENT_ID'];

    function userFactory ($http, $httpParamSerializer, environment, CLIENT_ID) {
        var userState = {
                username: null,
                accessToken: null,
                loggedIn: false
            };

        return {
            login: login,
            logout: logout,
            getStatus: getStatus
        };

        function login (username, password) {
            return $http({
                method: 'POST',
                url: environment.OAUTH_ROOT + 'token/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(
                    {
                        username: username,
                        password: password,
                        client_id: CLIENT_ID,
                        grant_type: 'password'
                    }
                )
            }).then(function(response) {
                userState.username = username;
                userState.accessToken = response.data.access_token;
                userState.loggedIn = true;
            });
        }

        function logout () {
            return $http({
                method: 'POST',
                url: environment.OAUTH_ROOT + 'revoke_token/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(
                    {
                        token: userState.accessToken,
                        client_id: CLIENT_ID
                    }
                )
            }).then(function () {
                userState.username = null;
                userState.accessToken = null;
                userState.loggedIn = false;
            });
        }

        function getStatus () {
            return userState;
        }
    }

})();
