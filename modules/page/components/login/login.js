(function () {
  'use strict';

  angular.module('atlasPage')
    .directive('login', loginDirective)
    .controller('LoginController', LoginController);

  function loginDirective () {
    return {
      restrict: 'E',
      templateUrl: 'modules/page/components/login/login.html',
      controller: 'LoginController as vm'
    };
  }

  LoginController.$inject = ['userService', '$rootScope'];
  function LoginController(userService, $rootScope) {
    var vm = this;
    vm.user = userService.user;
    vm.userNew = {};
    vm.loginIsDisabled = false;
    vm.submitLabel = 'Inloggen';

    vm.login = function (user) {
      vm.loginIsDisabled = true;
      userService.login (user.username, user.password);
    };

    vm.logout = function() {
      userService.logout ();
    };


    vm.loginError = function (response) {
      vm.loginIsDisabled = false;
      if (response.status === 401) {
        vm.notificationText = 'De combinatie gebruikersnaam en wachtwoord wordt niet herkend.';
      } else if (response.status === 404) {
        vm.notificationText = 'Er is iets mis met de inlog server, probeer het later nog eens.';
      } else {
        vm.notificationText = 'Er is een fout opgetreden.' +
          'Neem contact op met de beheerder en vermeld code: ' +
          response.status + ' status: ' + response.statusText + '.';
      }
    };

    vm.loginSuccess = function () {
      vm.loginIsDisabled = false;
    };

    $rootScope.$on('userService.login.error', function(event, response) {vm.loginError(response);});
    $rootScope.$on('userService.login.success', function(event, response) {vm.loginSuccess(response);});


  }

})();
