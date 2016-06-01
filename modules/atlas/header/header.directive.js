(function () {
    'use strict';

    angular
        .module('atlas')
        .directive('atlasHeader', atlasHeaderDirective);

    atlasHeaderDirective.$inject = ['Header', 'store'];

    function atlasHeaderDirective (Header, store) {
        return {
            restrict: 'E',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var header,
                oldState;

            header = Header.initialize(element, store);

            store.subscribe(update);

            function update () {
                var newState = store.getState(),
                    oldQuery,
                    newQuery;

                oldQuery = oldState && oldState.search && oldState.search.query;
                newQuery = newState.search && newState.search.query;

                if (oldQuery !== newQuery) {
                    header.setQuery(newQuery);
                }

                oldState = newState;
            }
        }
    }
})();