(function () {
    angular
        .module('atlasSearchResults')
        .factory('geosearchFormatter', geosearchFormatterFactory);

    geosearchFormatterFactory.$inject = ['SEARCH_CONFIG'];

    function geosearchFormatterFactory (SEARCH_CONFIG) {
        return {
            format: format
        };

        function format (allSearchResults) {
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
                        slug: rawCategory.slug,
                        label_singular: rawCategory.label_singular,
                        label_plural: rawCategory.label_plural,
                        results: allFeaturesFlattened
                            .filter(function (feature) {
                                return rawCategory.features.indexOf(feature.type) !== -1;
                            })
                            .map(function (feature) {
                                return {
                                    label: feature.display,
                                    subtype: feature.opr_type ? feature.opr_type.toLowerCase() : null,
                                    endpoint: feature.uri
                                };
                            }),
                        useIndenting: rawCategory.slug === 'category'
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