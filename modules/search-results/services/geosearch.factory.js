(function () {
    angular
        .module('atlasSearchResults')
        .factory('geosearch', geosearchFactory);

    geosearchFactory.$inject = ['$q', 'api', 'geosearchFormatter', 'searchFormatter', 'SEARCH_CONFIG'];

    function geosearchFactory ($q, api, geosearchFormatter, searchFormatter, SEARCH_CONFIG) {
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
                .then(geosearchFormatter.format)
                .then(getVerblijfsobjecten)
                .then(function (data) {
                    console.log(data);

                    return data;
                });
        }

        function getVerblijfsobjecten (geosearchResults) {
            var q,
                pandCategoryIndex,
                pandEndpoint;

            q = $q.defer();

            geosearchResults.forEach(function (category, index) {
                if (category.slug === 'pand') {
                    pandCategoryIndex = index;
                    pandEndpoint = category.results[0].endpoint;
                }
            });

            if (angular.isDefined(pandEndpoint)) {
                api.getByUrl(pandEndpoint).then(function (pand) {
                    api.getByUrl(pand.verblijfsobjecten.href).then(function (verblijfsobjecten) {
                        var geosearchResultsCopy = angular.copy(geosearchResults);

                        //Splice modifies the existing Array, we don't want our input to change
                        geosearchResultsCopy.splice(
                            pandCategoryIndex + 1,
                            0,
                            searchFormatter.format([verblijfsobjecten])[0]
                        );

                        q.resolve(geosearchResultsCopy);
                    });
                });
            } else {
                q.resolve(geosearchResults);
            }

            return q.promise;
        }
    }
})();