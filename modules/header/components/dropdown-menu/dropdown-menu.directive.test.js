describe('the dropdown menu directive', function () {
    var $compile,
        $rootScope;

    beforeEach(function(){
        angular.mock.module(
            'atlasHeader',
            function ($provide) {
                $provide.factory('dpLinkDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getDirective (label) {
        var directive,
            element,
            scope;

        element = document.createElement('atlas-dropdown-menu');
        document.body.appendChild(element);
        element.setAttribute('label', label);

        scope = $rootScope.$new();

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('should show the passed label text in the menu button', function () {
        var directive = getDirective('dropdown-menu');

        expect(directive.find('.site-header__navigation__item').text().trim()).toBe('dropdown-menu');
    });

    it('should initialize with isVisible set to false/menu items are not visible', function () {
        var directive = getDirective('dropdown-menu');

        expect(directive.find('div').length).toBe(0);
        expect(directive.find('ng-transclude').length).toBe(0);
    });

    it('should transclude the menu items specified in the tag into the dropdown menu items', function () {
        var directive = getDirective('dropdown-menu');

        directive.find('.site-header__navigation__item').eq(0).click();

        expect(directive.find('div').length).toBe(1);
        expect(directive.find('ng-transclude').length).toBe(1);
    });

    it('should toggle the visibility of the menu items when you click menu button', function () {
        var directive = getDirective('dropdown-menu');

        directive.find('.site-header__navigation__item').eq(0).click();
        expect(directive.find('div').length).toBe(1);

        directive.find('.site-header__navigation__item').eq(0).click();
        expect(directive.find('div').length).toBe(0);
    });

    it('should hide the menu items if you click elsewhere on the page', function () {
        var directive = getDirective('dropdown-menu');
        expect(directive.find('div').length).toBe(0);

        directive.find('.site-header__navigation__item').eq(0).click();
        expect(directive.find('div').length).toBe(1);

        directive.find('div').eq(0).click();
        expect(directive.find('div').length).toBe(0);
    });

    it('should also show and hide individually with more then one dropdown menu on the page', function () {
        var directive1 = getDirective('dropdown-menu'),
            directive2 = getDirective('menu');

        expect(directive1.find('div').length).toBe(0);
        expect(directive2.find('div').length).toBe(0);

        directive1.find('.site-header__navigation__item').eq(0).click();
        expect(directive1.find('div').length).toBe(1);
        expect(directive2.find('div').length).toBe(0);

        directive2.find('.site-header__navigation__item').eq(0).click();
        expect(directive1.find('div').length).toBe(0);
        expect(directive2.find('div').length).toBe(1);

    });
});