(function() {
  'use strict';

  angular.module('dpShared')
    .service('userService', UserService);

  UserService.$inject = ['environment', 'CLIENT_ID', '$http', '$q', '$httpParamSerializer', '$rootScope', '$window'];

  function UserService(environment, CLIENT_ID, $http, $q, $httpParamSerializer, $rootScope, $window) {
    var self = this;

    self.user = {
      'username': '',
      'loggedIn': false,
      'token': ''
    };

    self.login = function(username, password) {
      var request = $http({
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
        $rootScope.$broadcast('UserService.login.success', response);
        deferred.resolve(self.user);
        $window.history.back();
      }, function(response) {
        $rootScope.$broadcast('UserService.login.error', response);
        deferred.reject(response.data);
      });

      return deferred.promise;
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
