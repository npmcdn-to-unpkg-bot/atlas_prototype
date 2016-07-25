(function () {
    angular
        .module('atlasSearchResults')
        .factory('loadMore', loadMoreFactory);

    loadMoreFactory.$inject = ['api', 'searchFormatter'];

    function loadMoreFactory (api, searchFormatter) {
        return {
            next: next
        };

        function next (category) {
            return api.getByUrl(category.next)
                //.then(searchFormatter.formatLinks)
                .then(function (nextPageData) {
                    //Don't change the input, create a new variable
                    var output = {};

                    output.count = nextPageData.count;
                    output.results = category.results.concat(nextPageData.results);

                    if (output.count > output.results) {
                        output.next = nextPageData._links.next.href;
                    } else {
                        output.next = null;
                    }

                    return output;
                });
        }
    }
})();