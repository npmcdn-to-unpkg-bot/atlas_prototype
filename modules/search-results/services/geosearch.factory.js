(function () {
    angular
        .module('atlasSearchResults')
        .factory('geosearch', geosearchFactory);

    geosearchFactory.$inject = ['$q', 'api', 'search', 'SEARCH_CONFIG'];

    function geosearchFactory ($q, api, search, SEARCH_CONFIG) {
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

            return $q.all(allRequests)
                .then(formatResults)
                .then(function (searchResults) {
                    var pandIndex,
                        pandEndpoint;

                    pandIndex = getPandIndex(searchResults);

                    if (pandIndex !== -1) {
                        pandEndpoint = searchResults[pandIndex].results[0].endpoint;
                        console.log(pandEndpoint);

                        return api.getByUrl(pandEndpoint).then(function (pand) {
                            console.log(pand.verblijfsobjecten.count);

                            return api.getByUrl(pand.verblijfsobjecten.href).then(function (verblijfsobjecten) {
                                return {
                                    label: 'Adressen',
                                    count: verblijfsobjecten.count,
                                    results: verblijfsobjecten.results.map(function (verblijfsobject) {
                                        return {
                                            label: verblijfsobject._display,
                                            slug: 'bag/verblijfsobject',
                                            endpoint: verblijfsobject._links.self.href
                                        };
                                    })
                                };
                            }).then(function (d) {
                                console.log(d);
                            });
                        });
                    }

                    return searchResults;
                });
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
                                    slug: feature.type,
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

        function getPandIndex (formattedSearchResults) {
            var pandIndex = -1;

            formattedSearchResults.forEach(function (category, categoryIndex) {
                category.results.filter(function (result) {
                    if (result.slug === 'bag/pand') {
                        pandIndex = categoryIndex;
                    }
                });
            });

            return pandIndex;
        }
    }
})();