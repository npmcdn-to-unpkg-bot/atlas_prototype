(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .factory('autocompleteData', autocompleteDataService);

    autocompleteDataService.$inject = ['$q', '$http', 'environment', 'HEADER_CONFIG'];

    function autocompleteDataService ($q, $http, environment, HEADER_CONFIG) {
        var request;

        return {
            search: search,
            cancel: cancel,
            getSuggestionByIndex: getSuggestionByIndex
        };

        function search (query) {
            //An $http call can't be aborted, hence the $q promise and it's reject method
            request = $q.defer();

            $http({
                method: 'GET',
                url: environment.API_ROOT + HEADER_CONFIG.AUTOCOMPLETE_ENDPOINT,
                params: {
                    q: query
                }
            }).then(function (response) {
                request.resolve(formatData(response.data));
            });

            return request.promise;
        }

        function formatData (categories) {
            var suggestionIndex = 0,
                numberOfResults = 0;

            categories.forEach(function (category) {
                category.content.map(function (suggestion) {
                    suggestion.index = suggestionIndex++;
                    numberOfResults++;

                    return suggestion;
                });
            });

            return {
                count: numberOfResults,
                data: categories
            };
        }

        function cancel () {
            if (angular.isDefined(request)) {
                request.reject('cancelled');
            }
        }

        function getSuggestionByIndex (searchResults, index) {
            var activeSuggestion;

            searchResults.forEach(function (category) {
                category.content.forEach(function (suggestion) {
                    if (suggestion.index === index) {
                        activeSuggestion = suggestion;
                    }
                });
            });

            return activeSuggestion;
        }
    }
})();
