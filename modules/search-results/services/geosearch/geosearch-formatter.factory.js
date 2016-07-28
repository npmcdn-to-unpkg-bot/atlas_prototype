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
                        slug: rawCategory.slug || null,
                        label_singular: rawCategory.label_singular,
                        label_plural: rawCategory.label_plural,
                        results: allFeaturesFlattened
                            .filter(function (feature) {
                                return rawCategory.features.indexOf(feature.type) !== -1;
                            })
                            .map(function (feature) {
                                var subtype;

                                if (feature.opr_type) {
                                    subtype = feature.opr_type.toLowerCase();
                                } else if (feature.type.match(/^gebieden\//)) {
                                    subtype = feature.type.replace(/^gebieden\//, '');
                                } else {
                                    subtype = null;
                                }

                                return {
                                    label: feature.display,
                                    subtype: subtype,
                                    endpoint: feature.uri
                                };
                            }),
                        useIndenting: false
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