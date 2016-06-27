(function () {
  'use strict';

  angular
    .module('atlasHeader')
    .filter('suggestionHighlight', suggestionHighlightFilter);

  function suggestionHighlightFilter () {
    return function (suggestion, query) {
      return suggestion.replace(new RegExp('(' + query + ')', 'gi'), '<strong>$1</strong>');
    };
  }
})();
