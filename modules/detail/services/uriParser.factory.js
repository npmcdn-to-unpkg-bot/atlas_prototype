(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('uriparser', uriToTemplateUrlFactory);

    function uriToTemplateUrlFactory () {
        return {
            getTemplateUrl: getTemplateUrl
        };

        function getTemplateUrl (uri) {

            var parts = uri.split('/');

            var templateUrl = 'modules/detail/components/templates/' + parts[0] + '/' + parts[1] + '.html';

            return templateUrl;

        }
    }
})();