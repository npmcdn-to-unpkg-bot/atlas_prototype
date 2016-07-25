(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .factory('search', searchFactory);

    searchFactory.$inject = ['$q', 'SEARCH_CONFIG', 'api', 'searchFormatter'];

    function searchFactory ($q, SEARCH_CONFIG, api, searchFormatter) {
        return {
            search: search
        };

        function search (query) {
            var queries = [];

            SEARCH_CONFIG.QUERY_ENDPOINTS.forEach(function (endpoint) {
                var params = {
                    q: query,
                    page: 1
                };

                queries.push(
                    api.getByUri(endpoint.uri, params)
                );
            });

            //When all queries are resolved
            return $q.all(queries).then(searchFormatter.format);
        }
    }
})();
