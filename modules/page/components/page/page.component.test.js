xdescribe('The page component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('atlasPage');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (name) {
        var component,
            element,
            scope;

        element = document.createElement('atlas-page');
        element.setAttribute('name', name);

        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('loads an HTML page based on the name binding', function () {
        var component;

        component = getComponent('welcome');

    });

    it('changes the HTML page when the binding changes', function () {

    });
});