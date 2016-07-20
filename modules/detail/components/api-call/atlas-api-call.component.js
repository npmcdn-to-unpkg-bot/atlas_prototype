(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .component('atlasApiCall', {
            bindings: {
                endpoint: '@',
                partial: '@',
                useBrkObjectExpanded: '='
            },
            templateUrl: 'modules/detail/components/api-call/atlas-api-call.html',
            controller: AtlasApiCallController,
            controllerAs: 'vm'
        });

    AtlasApiCallController.$inject = ['api'];

    function AtlasApiCallController (api) {
        var vm = this,
            endpoint;

        if (angular.isString(vm.endpoint)) {
            endpoint = vm.endpoint;

            if (vm.useBrkObjectExpanded) {
                endpoint = vm.endpoint.replace('brk/object', 'brk/object-expand');
            }

            api.getByUrl(endpoint).then(function (response) {
                vm.apiData = {
                    count: response.count,
                    results: response.results || response
                };

                if (response._links.next) {
                    vm.apiData.next = response._links.next.href;
                }
            });
        }
    }
})();
