describe('The dp-straatbeeld-metadata component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('dpStraatbeeld');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        function getComponent (date, location) {
            var component,
                element,
                scope;
        }
    });

    it('always show the gray bar (even if there is no data)', function () {

    });

    it('only shows the meta information if it has a valid date and location', function () {

    });

    it('uses a date filter for formatting the date into dd-MM-yyyy', function () {

    });

    it('it uses a filter to display both the RD and the WGS84 coordinates', function () {

    });
});