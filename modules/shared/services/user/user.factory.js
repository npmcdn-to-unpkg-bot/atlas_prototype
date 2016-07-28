(function() {
    'use strict';

    angular
        .module('dpShared')
        .service('user', userFactory);

    userFactory.$inject = ['$http', '$httpParamSerializer', '$q', 'environment', 'CLIENT_ID'];

    function userFactory ($http, $httpParamSerializer, $q, environment, CLIENT_ID) {
        var userState = {
                username: null,
                accessToken: null,
                isLoggedIn: false
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
                })
                .then(loginSuccess, loginError);

            function loginSuccess (response) {
                //This is the username as entered by the user in the login form, the backend doesn't return the username
                userState.username = username;
                userState.accessToken = response.data.access_token;
                userState.isLoggedIn = true;
            }

            function loginError (response) {
                var q = $q.defer();

                switch (response.status) {
                    case 401:
                        q.reject('De combinatie gebruikersnaam en wachtwoord wordt niet herkend.');
                        break;
                    case 404:
                        q.reject('Er is iets mis met de inlog server, probeer het later nog eens.');
                        break;
                    default:
                        q.reject('Er is een fout opgetreden. Neem contact op met de beheerder en vermeld code: ' +
                            response.status + ' status: ' + response.statusText + '.');
                }

                return q.promise;
            }
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
                userState.isLoggedIn = false;
            });
        }

        function getStatus () {
            return userState;
        }
    }
})();
