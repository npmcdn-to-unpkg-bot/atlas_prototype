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

        if (vm.endpoint) {
            endpoint = vm.endpoint;

            if (vm.useBrkObjectExpanded) {
                endpoint = vm.endpoint.replace('brk/object', 'brk/object-expand');
            }

            setData(endpoint, true);

            vm.loadMore = function () {
                console.log('loard more!!!');
                setData(vm.apiData.next, false);
            };
        }

        function setData (endpoint, isFirstPage) {
            api.getByUrl(endpoint).then(function (response) {
                if (isFirstPage) {
                    vm.apiData = {
                        count: response.count,
                        results: response.results || response,
                        next: response._links.next.href
                    };
                } else {
                    console.log(endpoint, response);
                    vm.apiData.results = vm.apiData.results.concat(response.results || response);
                    vm.apiData.next = response._links.next.href;
                }

                console.log(vm.apiData.results);
            });
        }
    }
})();
