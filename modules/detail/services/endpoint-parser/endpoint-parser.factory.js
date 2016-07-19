(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('endpointParser', endpointParserFactory);

    endpointParserFactory.$inject = ['environment'];

    function endpointParserFactory (environment) {
        return {
            getTemplateUrl: getTemplateUrl
        };

        function getTemplateUrl (endpoint) {
            var endpointWithoutTrailingSlash,
                uriParts,
                template;

            endpointWithoutTrailingSlash = endpoint.replace(/\/$/, '');

            //Transform http://www.api-root.com/this/that/123 to ['this', 'that', '123']
            uriParts = endpointWithoutTrailingSlash.replace(new RegExp(environment.API_ROOT), '').split('/');

            if (isZakelijkRecht(uriParts)) {
                template = 'brk/subject.html';
            } else {
                template = uriParts[0] + '/' + uriParts[1] + '.html';
            }

            return 'modules/detail/components/detail/templates/' + template;

            function isZakelijkRecht (uriParts) {
                return uriParts[0] === 'brk' &&
                    uriParts[1] === 'zakelijk-recht' &&
                    uriParts[uriParts.length - 1] === 'subject';
            }
        }
    }
})();