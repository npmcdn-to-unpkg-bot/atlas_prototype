xdescribe('The partialCompiler factory', function () {
    var $rootScope,
        $templateCache,
        $httpBackend,
        partialCompiler;

    beforeEach(function () {
        angular.mock.module('atlasDetail');

        angular.mock.inject(function (_$rootScope_, _$templateCache_, _$httpBackend_, _partialCompiler_) {
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;
            $httpBackend = _$httpBackend_;
            partialCompiler = _partialCompiler_;
        });

        $templateCache.put('basic-template.html', '<p>First paragraph</p><p>Second paragraph</p>');
        $templateCache.put(
            'path/template-with-variables.html',
            '<h1>{{apiData.header}}</h1><p>{{apiData.paragraph}}</p>'
        );
    });

    it('gets a template based on an url and returns the HTML', function () {
        var output;

        partialCompiler.getHtml('basic-template.html', {}).then(function (_output_) {
            output = _output_;
        });

        //$templateRequest needs an extra digest cycle
        $rootScope.$apply();
        $rootScope.$apply();

        expect(output[0].outerHTML).toBe('<p class="ng-scope">First paragraph</p>');
        expect(output[1].outerHTML).toBe('<p class="ng-scope">Second paragraph</p>');
    });

    it('creates a scope and puts data on it', function () {
        var output,
            data = {
                header: 'This is a heading',
                paragraph: 'This is a paragraph.'
            };

        partialCompiler.getHtml('path/template-with-variables.html', data).then(function (_output_) {
            output = _output_;
        });

        //$templateRequest needs an extra digest cycle
        $rootScope.$apply();
        $rootScope.$apply();

        expect(output[0].outerHTML).toBe('<h1 class="ng-binding ng-scope">This is a heading</h1>');
        expect(output[1].outerHTML).toBe('<p class="ng-binding ng-scope">This is a paragraph.</p>');
    });
});