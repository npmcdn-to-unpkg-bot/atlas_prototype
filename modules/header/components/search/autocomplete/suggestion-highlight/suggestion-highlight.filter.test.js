xdescribe('The dpSuggestionHighlight filter', function () {
  var dpSuggestionHighlight;

  beforeEach(function () {
    angular.mock.module('atlasApp');

    angular.mock.inject(function (_dpSuggestionHighlightFilter_) {
      dpSuggestionHighlight = _dpSuggestionHighlightFilter_;
    });
  });

  it('highlights the query in each suggestion', function () {
    var output = dpSuggestionHighlight('Linnaeusstraat', 'Linnaeu');

    expect(output).toBe('<strong>Linnaeu</strong>sstraat');
  });

  it('matches are case-insenstive but it preserves the casing in the output', function () {
    var output = dpSuggestionHighlight('Linnaeusstraat', 'liNNaEU');

    expect(output).toBe('<strong>Linnaeu</strong>sstraat');
  });

  it('matches all text, not just prefixes', function () {
    var output = dpSuggestionHighlight('Linnaeusstraat', 'aeus');

    expect(output).toBe('Linn<strong>aeus</strong>straat');
  });
});
