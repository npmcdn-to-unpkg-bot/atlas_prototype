describe('The dp-panel component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_
        });
    });

    function getComponent (heading, icon, content) {
        var component,
            panelElement,
            panelIconElement,
            panelBodyElement,
            scope;

        panelElement = document.createElement('dp-panel');
        panelElement.setAttribute('heading', heading);

        panelIconElement = document.createElement('dp-panel-icon');
        panelIconElement.appendChild(icon);
        panelElement.append(panelIconElement);

        panelBodyElement = document.createElement('dp-panel-body');
        panelBodyElement.appendChild(content);
        panelElement.append(panelBodyElement);

        scope = $rootScope.$new();

        component = $compile(panelElement)(scope);
        scope.$apply();

        return component;
    }

    it('creates a common HTML pattern (used by dp-layer-selection and the map legend', function () {

    });
});