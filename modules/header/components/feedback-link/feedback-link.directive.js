(function () {
  'use strict';

  angular
    .module('atlasHeader')
    .directive('feedbackLink', feedbackLink);

  feedbackLink.$inject = [];

  function feedbackLink() {
    return {
      bindToController: true,
      controller: FeedbackLinkController,
      controllerAs: 'feedbackLinkController',
      transclude: true,
      replace: true,
      restrict: 'E',
      template: '<button ng-click="feedbackLinkController.openMail()" ng-transclude></button>',
      scope: {}
    };
  }

  FeedbackLinkController.$inject = ['$window', '$location'];

  function FeedbackLinkController($window, $location) {
    var vm = this;
    var recipient = 'terugmelding.basisinformatie@amsterdam.nl';
    var subject = 'Terugmelding atlas.amsterdam.nl';
    var body = 'Terugmeldingen voor de pagina: ' + $location.absUrl() + '\n\n';
    var mailTo = 'mailto:' +
      recipient + '?subject=' +
      $window.encodeURIComponent(subject) +
      '&body=' + $window.encodeURIComponent(body);

    vm.openMail = openMail;

    function openMail() {
      $window.location.href = mailTo;
    }
  }
})();
