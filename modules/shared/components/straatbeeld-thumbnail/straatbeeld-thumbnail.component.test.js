describe('The dp-straatbeeld-thumbnail component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                detailConfig: {
                    STRAATBEELD_THUMB_URL: 'http://fake.straatbeeld.url/path/'
                }
            },
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

    function getComponent (location) {
        var component,
            element,
            scope;

        element = document.createElement('dp-straatbeeld-thumbnail');
        element.setAttribute('location', 'location');

        scope = $rootScope.$new();
        scope.location = location;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('loads a thumbnail based on a location', function () {
        var component = getComponent([52.369, 4.963]);

        expect(component.find('img').attr('src'))
            .toBe('http://fake.straatbeeld.url/path/?lat=52.369&lon=4.963&width=240&height=135');
    });

    it('wraps the thumbnail inside a dp-link that triggers FETCH_STRAATBEELD', function () {
        var component = getComponent([52.369, 4.963]),
            scope = component.isolateScope();

        expect(component.find('dp-link img')).toBeDefined();
        expect(component.find('dp-link').length).toBe(1);
        expect(component.find('img').length).toBe(1);

        expect(component.find('dp-link').attr('type')).toBe('FETCH_STRAATBEELD');
        expect(component.find('dp-link').attr('payload')).toEqual('vm.location');
        expect(scope.vm.location).toEqual([52.369, 4.963]);
    });
});