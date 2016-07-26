(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .factory('searchFormatter', searchFormatterFactory);

    searchFormatterFactory.$inject = ['SEARCH_CONFIG'];

    function searchFormatterFactory (SEARCH_CONFIG) {
        return {
            formatCategories: formatCategories,
            formatLinks: formatLinks
        };

        function formatCategories (allSearchResults) {
            return allSearchResults
                .map(function (endpointSearchResults, index) {
                    var links;

                    links = angular.isObject(endpointSearchResults) && endpointSearchResults.results || [];

                    return {
                        label_singular: SEARCH_CONFIG.QUERY_ENDPOINTS[index].label_singular,
                        label_plural: SEARCH_CONFIG.QUERY_ENDPOINTS[index].label_plural,
                        slug: SEARCH_CONFIG.QUERY_ENDPOINTS[index].slug,
                        count: angular.isObject(endpointSearchResults) && endpointSearchResults.count || 0,
                        results: formatLinks(links),
                        useIndenting: false,
                        next: angular.isObject(endpointSearchResults) &&
                            endpointSearchResults._links &&
                            endpointSearchResults._links.next.href || null
                    };
                })
                //Remove 'empty' categories with no search results
                .filter(function (endpointSearchResults) {
                    return endpointSearchResults.count;
                });
        }

        function formatLinks (links) {
            return links.map(function (item) {
                return {
                    label: item._display,
                    endpoint: item._links.self.href,
                    subtype: item.subtype || null
                };
            });
        }
    }
})();
