(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .factory('searchFormatter', searchFormatterFactory);

    searchFormatterFactory.$inject = ['SEARCH_CONFIG'];

    function searchFormatterFactory (SEARCH_CONFIG) {
        return {
            format: format
        };

        function format (allSearchResults) {
            return allSearchResults
                .map(function (endpointSearchResults, index) {
                    var links,
                        formattedLinks;

                    links = angular.isObject(endpointSearchResults) && endpointSearchResults.results || [];

                    formattedLinks = links.map(function (item) {
                        return {
                            label: item._display,
                            endpoint: item._links.self.href,
                            subtype: item.subtype
                        };
                    });

                    return {
                        label: SEARCH_CONFIG.QUERY_ENDPOINTS[index].label_plural,
                        slug: SEARCH_CONFIG.QUERY_ENDPOINTS[index].slug,
                        count: angular.isObject(endpointSearchResults) && endpointSearchResults.count || 0,
                        results: formattedLinks
                    };
                })
                //Remove 'empty' categories with no search results
                .filter(function (endpointSearchResults) {
                    return endpointSearchResults.count;
                });
        }
    }
})();
