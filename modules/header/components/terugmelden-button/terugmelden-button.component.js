(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .component('atlasTerugmeldenButton', {
            transclude: true,
            templateUrl: 'modules/header/components/terugmelden-button/terugmelden-button.html',
            controller: AtlasTerugmeldenButtonController,
            controllerAs: 'vm'
        });

    AtlasTerugmeldenButtonController.$inject = ['$window', '$location'];

    function AtlasTerugmeldenButtonController ($window, $location) {
        var vm = this,
            recipient,
            subject,
            body;

        recipient = 'terugmelding.basisinformatie@amsterdam.nl';
        subject = 'Terugmelding atlas.amsterdam.nl';
        body = 'Terugmeldingen voor de pagina: ' + $location.absUrl() + '\n\n';

        vm.mailtoLink = 'mailto:' + recipient +
            '?subject=' + $window.encodeURIComponent(subject) +
            '&body=' + $window.encodeURIComponent(body);
    }
})();
