(function () {
    angular
        .module('atlasDetail')
        .component('atlasDetail', {
            bindings: {
                uri: '@',
                isLoading: '=',
                store: '='
            },
            templateUrl: 'modules/detail/components/detail/detail.html',
            controller: AtlasDetailController,
            controllerAs: 'vm'
        });

    AtlasDetailController.$inject = ['$scope', 'ACTIONS', 'api', 'uriParser'];

    function AtlasDetailController ($scope, ACTIONS, api, uriParser) {
        var vm = this;

        $scope.$watch('vm.uri', function(newValue) {
            api.getByUri(newValue).then(function (apiData) {
                //koppel data aan de scope
                vm.apiData = apiData;

                //koppel de goede template op basis van de uri
                vm.templateUrl = uriParser.getTemplateUrl(newValue);
                console.log(vm.templateUrl);

                //trap de actie show_detail af als alle api informatie binnen is
                vm.store.dispatch({
                    type: ACTIONS.SHOW_DETAIL,
                    payload: {
                        //TODO placeholders vervangen voor echte data
                        location: [52.378086874951386, 4.922568081008677],
                        highlight: {}
                    }
                });
            });

        });

        vm.openStraatbeeld = function (straatbeeldId) {
            vm.store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: straatbeeldId
            });
        };
    }
})();