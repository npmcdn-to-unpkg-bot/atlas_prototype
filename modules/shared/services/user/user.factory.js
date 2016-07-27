(function() {
    'use strict';

    angular
        .module('dpShared')
        .service('user', userFactory);

    userFactory.$inject = ['environment', 'CLIENT_ID', '$http', '$httpParamSerializer', '$rootScope', '$window'];

    function userFactory (environment, CLIENT_ID, $http, $httpParamSerializer, $rootScope, $window) {
        var userStatus = {
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
                data: $httpParamSerializer({
                    'username': username,
                    'password': password,
                    'client_id': CLIENT_ID,
                    'grant_type': 'password'
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            var deferred = $q.defer();

            request.then(function(response) {
                self.user.username = username;
                self.user.loggedIn = true;
                self.user.token = response.data.access_token;
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                $rootScope.$broadcast('userService.login.success', response);
                deferred.resolve(self.user);
                $window.history.back();
            }, function(response) {
                $rootScope.$broadcast('userService.login.error', response);
                deferred.reject(response.data);
            });

            return deferred.promise;
        }

        function logout () {
            //userStatus.loggedIn = false;
        }

        function getStatus () {

        }

        self.login = function(username, password) {

        };

        self.logout = function() {
            $http({
                method: 'POST',
                url: environment.OAUTH_ROOT + 'revoke_token/',
                data: $httpParamSerializer({
                    'token': self.user.token,
                    'client_id': CLIENT_ID
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            self.user.username = '';
            self.user.loggedIn = false;
            self.user.token = '';

            delete $http.defaults.headers.common['Authorization'];
        };
    }

})();
