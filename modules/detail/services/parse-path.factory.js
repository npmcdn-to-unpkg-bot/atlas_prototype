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

            var parts = path.split('/');

            var templateUri = parts[0] + '/' + parts[1];
            var templateUrl = 'modules/detail/components/detail/templates/' + templateUri + '.html';

            return new ParsePathResult(
                templateUri,
                templateUrl
            );
        }

        function ParsePathResult(templateUri, templateUrl) {
            this.templateUri = templateUri;
            this.templateUrl = templateUrl;
        }
    }
})();