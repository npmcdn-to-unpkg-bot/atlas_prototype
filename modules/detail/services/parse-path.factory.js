(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('pathParser', pathParserFactory);

    pathParserFactory.$inject = ['environment'];

    function pathParserFactory (environment) {
        return {
            parsePath: parsePath
        };

        function parsePath (uri) {
            if(uri.indexOf(environment.API_ROOT) !== -1) {
                uri = uri.substr(environment.API_ROOT.length);
            }

            var parts = uri.split('/');

            var templateUri = parts[0] + '/' + parts[1];
            var templateUrl = 'modules/detail/components/detail/templates/' + templateUri + '.html';

            return new ParseUriResult(
                templateUri,
                templateUrl
            );
        }

        function ParseUriResult(templateUri, templateUrl) {
            this.templateUri = templateUri;
            this.templateUrl = templateUrl;
        }
    }
})();