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

            path = trimSlash(path);

            parts = path.split('/');

            //in kadestrale objecten zit een link naar zakeijke recten, endigend op subject
            //die geparst moet worden naar een subject link ivm bescherming persoonsgegevens
            var lastPart = parts[parts.length-1];
            if(parts[1] === 'zakelijk-recht' && lastPart === 'subject') {
                parts[1] = 'subject';
            }

            dataset = parts[0];
            templateUri = parts[0] + '/' + parts[1];
            templateUrl = 'modules/detail/components/detail/templates/' + templateUri + '.html';

            return new ParsePathResult(
                dataset,
                templateUri,
                templateUrl
            );
        }

        function ParsePathResult(dataset, templateUrl) {
            this.dataset = dataset;
            this.templateUrl = templateUrl;
        }

        function trimSlash(s) {
            if (s.charAt(0) === '/') {
                s = s.substr(1);
            }
            if (s.charAt(s.length - 1) === '/') {
                s = s.substr(0, s.length - 1);
            }
            return s;
        }
    }
})();