(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApi', dataSelectionApiFactory);

    dataSelectionApiFactory.$inject = ['DATA_SELECTION_CONFIG', 'api'];

    function dataSelectionApiFactory (DATA_SELECTION_CONFIG, api) {
        return {
            query: query
        };

        function query (dataset, activeFilters) {
            var filterParams = {};

            //Maak een API url op basis van de activeFilters

            return api.getByUrl(DATA_SELECTION_CONFIG[dataset].ENDPOINT, filterParams).then(function (data) {
                //Filter stuff
                var filters = [];

                angular.forEach(data.aggs_list, function (value, key) {
                    var filter;

                    if (DATA_SELECTION_CONFIG[dataset].FILTER_PRIORITY.indexOf(key) !== -1) {
                        filter = {
                            slug: key,
                            label: key,
                            options: []
                        };

                        value.buckets.forEach(function (option) {
                            filter.options.push({
                                label: option.key,
                                count: option.doc_count
                            });
                        });

                        filters.push(filter);
                    }
                });

                filters = filters.sort(function (filterA, filterB) {
                    return DATA_SELECTION_CONFIG[dataset].FILTER_PRIORITY.indexOf(filterA.slug) -
                        DATA_SELECTION_CONFIG[dataset].FILTER_PRIORITY.indexOf(filterB.slug);
                });

                //Table stuff
                var tableDataHead = [],
                    tableDataBody = [];

                DATA_SELECTION_CONFIG[dataset].TABLE_FIELDS.forEach(function (field) {
                    tableDataHead.push(field.label);
                });

                data.object_list.forEach(function (row) {
                    var fieldsThisRow = [];

                    DATA_SELECTION_CONFIG[dataset].TABLE_FIELDS.forEach(function (field) {
                        fieldsThisRow.push(row[field.slug]);
                    });

                    tableDataBody.push(fieldsThisRow);
                });

                return {
                    filters: filters,
                    tableData: {
                        head: tableDataHead,
                        body: tableDataBody
                    }
                };
            });
        }
    }
})();