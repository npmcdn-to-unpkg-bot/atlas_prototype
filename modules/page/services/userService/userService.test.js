(function() {
  'use strict';

  describe('The user service', function() {
    // ========================================================
    // 1. We define our dependencies
    // ========================================================

    var UserService;

    var environment = {
      'OAUTH_ROOT': 'http://test/o/'
    };

    beforeEach(angular.mock.module('atlasDetail'));
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('environment', environment);
      $provide.constant('CLIENT_ID', 'lalalala');
    }));

    // ========================================================
    // 2. Inject our dependencies
    // ========================================================

    beforeEach(angular.mock.inject(function(_UserService_) {
      UserService = _UserService_;
    }));

    // ========================================================
    // 3. The Actual Tests
    // ========================================================

    it('is defined', function() {
      expect(UserService).toBeDefined();
    });

    it('always exposes a current user', function() {
      expect(UserService.user).toBeDefined();
      expect(UserService.user.loggedIn).toBe(false);
      expect(UserService.user.username).toBe('');
      expect(UserService.user.token).toBe('');
    });

    describe('the login function', function() {
      var backend, $http;

      beforeEach(angular.mock.inject(function($httpBackend, _$http_) {
        backend = $httpBackend;
        $http = _$http_;

        backend.whenPOST('http://test/o/token/',
          function(data) {
            return data.indexOf('username=yigal') >= 0;
          },
          function(headers) {
            return headers['Content-Type'] === 'application/x-www-form-urlencoded';
          }
        ).respond({
            'access_token': '1234',
            'scope': 'write read',
            'refresh_token': '4567',
            'expires_in': 3600,
            'token_type': 'Bearer'
          });

        backend.whenPOST('http://test/o/token/',
          function(data) {
            return data.indexOf('username=tristan') >= 0;
          },
          function(headers) {
            return headers['Content-Type'] === 'application/x-www-form-urlencoded';
          }
        ).respond(401, {
            'error': 'invalid_grant',
            'error_description': 'Invalid credentials given'
          });

      }));

      afterEach(function() {
        backend.verifyNoOutstandingRequest();
      });

      it('retrieves a token', function() {
        UserService.login('yigal', 'pwd');
        backend.flush();

        expect(UserService.user.loggedIn).toBe(true);
        expect(UserService.user.username).toBe('yigal');
        expect(UserService.user.token).toBe('1234');
      });

      it('sets the token as an HTTP default', function() {
        expect($http.defaults.headers.common.Authorization).toBeUndefined();

        UserService.login('yigal', 'pwd');
        backend.flush();

        expect($http.defaults.headers.common.Authorization).toBe('Bearer 1234');
      });

      it('returns a promise that is fulfilled after successful login', function() {
        var result;

        var promise = UserService.login('yigal', 'pwd');
        expect(promise).toBeDefined();

        promise.then(function(user) { result = user; });

        backend.flush();

        expect(result).toBeDefined();
        expect(result.username).toBe('yigal');
      });

      it('returns a promise that is fulfilled after a failed login', function() {
        var result;

        var promise = UserService.login('tristan', 'pwd');
        expect(promise).toBeDefined();

        promise.then(function() {}, function(error) { result = error; });
        backend.flush();

        expect(result).toBeDefined();
        expect(result.error).toBe('invalid_grant');

        expect(UserService.user.loggedIn).toBe(false);
        expect(UserService.user.username).toBe('');
        expect(UserService.user.token).toBe('');
      });
    });

    describe('the logout function', function() {
      var backend, $http;

      beforeEach(angular.mock.inject(function($httpBackend, _$http_) {
        backend = $httpBackend;
        $http = _$http_;

        UserService.user.username = 'yigal';
        UserService.user.loggedIn = true;
        UserService.user.token = '0987';
        $http.defaults.headers.common.Authorization = 'Bearer 0987';

        backend.expectPOST('http://test/o/revoke_token/', 'client_id=lalalala&token=0987').respond();
      }));

      it('invalidates the token on the server', function() {
        UserService.logout();
        backend.flush();
      });

      it('invalidates the current user', function() {
        UserService.logout();
        backend.flush();

        expect(UserService.user.username).toBe('');
        expect(UserService.user.loggedIn).toBe(false);
        expect(UserService.user.token).toBe('');
      });

      it('invalidates the authorization header', function() {
        UserService.logout();
        backend.flush();

        expect($http.defaults.headers.Authorization).toBe(undefined);
      });
    });
  });
})();
