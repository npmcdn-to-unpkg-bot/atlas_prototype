(function () {
    'use strict';

    angular
        .module('dpShared')
        .filter('longNameShortener', longNameShortenerFilter);

    longNameShortenerFilter.$inject = ['LONG_NAME_CONFIG'];

    function longNameShortenerFilter (LONG_NAME_CONFIG) {
        return function (input) {
            var output = angular.copy(input);

            angular.forEach(LONG_NAME_CONFIG, function (word) {
                angular.forEach(word.input, function (wordVariation) {
                    output = output.replace(new RegExp(wordVariation, 'i'), word.output);
                });
            });

            return output;
        };
    }
})();
