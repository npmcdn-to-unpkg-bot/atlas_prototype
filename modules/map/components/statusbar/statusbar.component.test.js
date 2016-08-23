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
    		var component = getComponent([], 8);
    		expect(component.find('.layers-labels.hide').length).toBe(1);
    		expect(component.find('.layers-labels.show').length).toBe(0);
    		component.find('.header').click();
    		component.find('.header').click();
    		expect(component.find('.layers-labels.hide').length).toBe(1);
    		expect(component.find('.layers-labels.show').length).toBe(0);
    	});
    });
    describe('Statusbar adds layer to legend', function() {
    	it('Starts closed', function() {
    		var component = getComponent([], 8);
    		expect(component.find('.layers-labels.hide').length).toBe(1);
    		expect(component.find('.layers-labels.show').length).toBe(0);
    	});
    	it('Starts empty', function() {
    		var component = getComponent([], 8);
    		expect(component.find('dp-overlay-legenda').length).toBe(0);
    	});
    	it('Correctly adds a new active layer', function() {
            var overlays = [],
                component = getComponent(overlays, 8);
           expect(component.find('dp-overlay-legenda').length).toBe(0);
           overlays = [{id: 'some_overlay', visibility: true}];
           component.isolateScope().vm.overlays = overlays;
           $rootScope.$apply();
           expect(component.find('dp-overlay-legenda').length).toBe(1);
    	});
    	it ('Correctly removes a removed layer', function() {
            var overlays = [{id: 'some_overlay', visibility: true}],
                component = getComponent(overlays, 8);
           expect(component.find('dp-overlay-legenda').length).toBe(1);
           overlays = [];
           component.isolateScope().vm.overlays = overlays;
           $rootScope.$apply();
           expect(component.find('dp-overlay-legenda').length).toBe(0);
    	});
    });
    describe('Statusbar layer counts', function() {
    	it ('Hides count with no layers active', function() {
            var overlays = [],
                component = getComponent(overlays, 8);
            expect(component.find('.qa-show-layers-count').length).toBe(0);
            overlays = [{id: 'some_overlay', visibility: true}, {id: 'other_overlay', visibility: true}];
            component.isolateScope().vm.overlays = overlays;
            $rootScope.$apply();
            expect(component.find('.qa-show-layers-count').length).toBe(1);
    	});
        it('Correctly count active layers', function() {
            var overlays = [{id: 'some_overlay', visibility: true}, {id: 'other_overlay', visibility: true}],
                val,
                component = getComponent(overlays, 8);
                expect(component.find('.qa-show-active-layers-count').length).toBe(1);
                val = component.find('.qa-show-active-layers-count')[0].innerText[0];
                expect(parseInt(val, 10)).toBe(2);
        });
    	it('Hides active count when non are hidden', function() {
            var overlays = [{id: 'some_overlay', visibility: true}, {id: 'other_overlay', visibility: true}],
                component = getComponent(overlays, 8);
            expect(component.find('.qa-show-visible-layers-count').length).toBe(0);
            expect(component.find('.qa-show-active-layers-count').length).toBe(1);
    	});
        it('Correctly counts visible layers', function() {
            var overlays = [{id: 'some_overlay', visibility: true}, {id: 'other_overlay', visibility: false}],
                val,
                component = getComponent(overlays, 8);
            expect(component.find('.qa-show-visible-layers-count').length).toBe(1);
            val = component.find('.qa-show-visible-layers-count')[0].innerText[0];
                expect(parseInt(val, 10)).toBe(1);
        });
    	it('Shows visible and active count when some layers are hidden', function() {
            var overlays = [{id: 'some_overlay', visibility: true}, {id: 'other_overlay', visibility: false}],
                component = getComponent(overlays, 8);
            expect(component.find('.qa-show-visible-layers-count').length).toBe(1);
            expect(component.find('.qa-show-active-layers-count').length).toBe(1);

    	});
    });
});