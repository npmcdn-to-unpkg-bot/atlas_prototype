(function () {
    angular
        .module('atlasSearchResults')
        .factory('searchByCoordinates', searchByCoordinatesFactory);

    searchByCoordinatesFactory.$inject = ['$q', 'api', 'SEARCH_CONFIG'];

    function searchByCoordinatesFactory ($q, api, SEARCH_CONFIG) {
        return {
            search: searchFeatures
        };

        function searchFeatures (location) {
            var allRequests = [];

            SEARCH_CONFIG.COORDINATES_ENDPOINTS.forEach(function (endpoint) {
                var request,
                    searchParams = {
                        lat: location[0],
                        lon: location[1]
                    };

                if (angular.isNumber(endpoint.radius)) {
                    searchParams.radius = endpoint.radius;
                }

                request = api.getByUri(endpoint.uri, searchParams);

                allRequests.push(request);
            });

            return $q.all(allRequests).then(formatResults);
        }

        function formatResults (allSearchResults) {
            var allFeatures = allSearchResults
                .map(function (searchResult) {
                    return searchResult.features.map(function (feature) {
                        return {
                            label: feature.properties.display,
                            endpoint: feature.properties.uri,
                            type: feature.properties.type
                        };
                    });
                })
                .reduce(function (previous, current) {
                    return previous.concat(current);
                }, []);

            console.log(allSearchResults, allFeatures);
            return allSearchResults;
            /*
                .map(function (endpointSearchResults) {
                    return {
                        count: endpointSearchResults.features.length
                    };
                    /*
                    return {
                        label: SEARCH_CONFIG.ENDPOINTS[index].label_plural,
                        slug: SEARCH_CONFIG.ENDPOINTS[index].slug,
                        count: angular.isObject(endpointSearchResults) && endpointSearchResults.count || 0,
                        results: formattedLinks
                    };
                });
             */
        }
    }
})();