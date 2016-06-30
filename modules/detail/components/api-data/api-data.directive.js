(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('atlasApiData', atlasApiDataDirective);

  atlasApiDataDirective.$inject = ['api'];

  /*
   * @param {String} uri - An API endpoint
   * @param {String} localScope - A variable name that refers to the API data which can be used in transcluded code
   *
   * @example
   * <dp-api-data uri="bag/verblijfsobject/12345/" local-scope="verblijfsobject">
   *   {{verblijfsobject._display}}
   *
   *   <dp-api-data uri="{{verblijfsobject.buurt._links.self.href}}" local-scope="buurt">
   *     buurt naam: {{buurt._display}}
   *     buurt code: {{buurt.code}}
   *   </dp-api-data>
   * </dp-api-data>
   */
  function atlasApiDataDirective (api) {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      templateUrl: 'modules/detail/components/api-data/api-data.html',
      link: linkFunction
    };

    function linkFunction (scope, element, attrs) {
      if (angular.isUndefined(scope.apiDataReady)) {
        scope.apiDataReady = {};
      }

      scope.apiDataReady[scope.$id] = false;

      api.getByUrl(attrs.url).then(function (data) {
        scope[attrs.localScope] = data;

        scope.apiDataReady[scope.$id] = true;
      });
    }
  }
})();
