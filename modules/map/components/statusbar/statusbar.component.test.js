describe('The atlas statusbar component', function() {
	var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            function ($provide) {
                $provide.factory('dpLinkDirective', function () {
                    return {};
                });
                $provide.factory('dpOverlayLegendaDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            }
        );
    });

    function getComponent (overlays, zoom) {
        var component,
            element,
            scope;

        element = document.createElement('dp-map-statusbar');
        element.setAttribute('overlays', 'overlays');
        element.setAttribute('zoom', 'zoom');

        scope = $rootScope.$new();
        scope.overlays = overlays;
        scope.zoom = zoom;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }


    describe('Statusbar present', function() {
    	it('Has layers panel', function() {
    		var component = getComponent([], 8);
    		expect(component.find('.layers-labels').length).toBe(1);
    	});
    	it('Can open the legend', function() {
    		var component = getComponent([], 8);
    		expect(component.find('.layers-labels.hide').length).toBe(1);
    		expect(component.find('.layers-labels.show').length).toBe(0);
    		component.find('.header').click();
    		expect(component.find('.layers-labels.hide').length).toBe(0);
    		expect(component.find('.layers-labels.show').length).toBe(1);
    		//expect(component.find('layers-labels').length).toBe(1);
    	});
    	it('Can close the legend', function() {
    		//var component = getComponent([], 8);
    	});
    });
    describe('Statusbar adds layer to legend', function() {
    	it('Starts closed', function() {

    	});
    	it('Starts empty', function() {

    	});
    	it('Correctly adds a new active layer', function() {

    	});
    	it ('Correctly removes a removed layer', function() {

    	});
    });
    describe('Statusbar layer counts', function() {
    	it ('Hides count with no layers active', function() {

    	});
    	it ('Only shows active count when non are hidden', function() {

    	});
    	it('Shows visible and active count when some layers are hidden', function() {

    	});
    });
});