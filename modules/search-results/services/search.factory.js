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

        function search (query, categorySlug) {
            var queries = [],
                params = {
                    q: query
                };

            SEARCH_CONFIG.QUERY_ENDPOINTS.forEach(function (endpoint) {
                if (!angular.isString(categorySlug) || categorySlug === endpoint.slug) {
                    queries.push(
                        api.getByUri(endpoint.uri, params)
                    );
                }
            });

            //When all queries are resolved
            return $q.all(queries).then(searchFormatter.formatCategories);
        }
    }
})();
