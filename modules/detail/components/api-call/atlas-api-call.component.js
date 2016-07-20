(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .component('atlasApiCall', {
            bindings: {
                endpoint: '@',
                expand: '@',
                partial: '@'
            },
            templateUrl: 'modules/detail/components/api-call/atlas-api-call.html',
            controller: AtlasApiCallController,
            controllerAs: 'vm'
        });

    AtlasApiCallController.$inject = ['api'];

    function AtlasApiCallController (api) {
        var vm = this;

        if (!vm.endpoint) {
            return;
        }

        vm.apiData = null;

        //vraag als true de api-expand resultaten op van BRK
        if (vm.expand) {
            vm.endpoint = vm.endpoint.replace('brk/object', 'brk/object-expand');
        }

        api.getByUrl(vm.endpoint).then(function (response) {
            vm.apiData = {};
            vm.apiData.count = response.count;

            if (response._links.next) {
                vm.apiData.next = response._links.next.href;
            }

            if(response.results) { //VBO & nummeraanduiding
                vm.apiData.results = response.results;
            } else {
                vm.apiData.results = response;
            }
        });
    }
})();
