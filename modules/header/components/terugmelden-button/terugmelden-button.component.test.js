describe('The atlas-terugmelden-button component', function () {
    var $compile,
        $rootScope,
        $window,
        $location,
        currentUrl = 'http://www.example.com/path/filename.html?foo=bar#baz';

    beforeEach(function () {
        angular.mock.module('atlasHeader');

        angular.mock.inject(function (_$compile_, _$rootScope_, _$location_, _$window_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $location = _$location_;
            $window = _$window_;
        });

        spyOn($location, 'absUrl').and.returnValue(currentUrl);
    });

    function getComponent (transcludeStr) {
        var component,
            element,
            scope;

        element = document.createElement('atlas-terugmelden-button');

        if (angular.isString(transcludeStr)) {
            element.innerHTML = transcludeStr;
        }

        scope = $rootScope.$new();
        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    it('sets a mailto URL', function () {
        var component = getComponent();

        expect(component.find('a').attr('href'))
            .toBe('mailto:terugmelding.basisinformatie@amsterdam.nl?subject=Terugmelding%20atlas.amsterdam.nl&body=Te' +
                'rugmeldingen%20voor%20de%20pagina%3A%20http%3A%2F%2Fwww.example.com%2Fpath%2Ffilename.html%3Ffoo%3Db' +
                'ar%23baz%0A%0A');
    });

    it('has transclude enabled', function () {
        var htmlStr = '<p id="unit-test-selector">This will be transcluded!</p>';

        expect(getComponent(htmlStr).find('p[id="unit-test-selector"]').text()).toBe('This will be transcluded!');
    });
});
