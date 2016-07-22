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
            var allFeaturesFlattened = allSearchResults
                    .map(function (searchResult) {
                        return searchResult.features.map(function (feature) {
                            return feature.properties;
                        });
                    })
                    .reduce(function (previous, current) {
                        return previous.concat(current);
                    }, []);

            return SEARCH_CONFIG.COORDINATES_HIERARCHY
                .map(function (rawCategory) {
                    var formattedCategory = {
                        label: rawCategory.label,
                        results: allFeaturesFlattened
                            .filter(function (feature) {
                                return rawCategory.features.indexOf(feature.type) !== -1;
                            })
                            .map(function (feature) {
                                return {
                                    label: feature.display,
                                    endpoint: feature.uri
                                };
                            })
                    };

                    formattedCategory.count = formattedCategory.results.length;

                    return formattedCategory;
                })
                .filter(function (category) {
                    //Remove empty categories
                    return category.count > 0;
                });
        }
    }
})();