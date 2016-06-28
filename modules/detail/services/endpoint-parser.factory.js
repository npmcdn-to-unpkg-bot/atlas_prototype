(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('endpointParser', endpointParserFactory);

    endpointParserFactory.$inject = ['environment'];

    function endpointParserFactory (environment) {
        return {
            parseEndpoint: parseEndpoint
        };

        function parseEndpoint (path) {
            if(path.indexOf(environment.API_ROOT) !== -1) {
                path = path.substr(environment.API_ROOT.length);
            }

            var dataset,
            parts,
            templateUri,
            templateUrl;


            parts = path.split('/');

            dataset = parts[0];
            templateUri = parts[0] + '/' + parts[1];
            templateUrl = 'modules/detail/components/detail/templates/' + templateUri + '.html';

            return new ParsePathResult(
                dataset,
                templateUri,
                templateUrl
            );
        }

        function ParsePathResult(dataset, templateUri, templateUrl) {
            this.dataset = dataset;
            this.templateUri = templateUri;
            this.templateUrl = templateUrl;
        }
    }
})();