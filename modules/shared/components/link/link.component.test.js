describe('The dp-link component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            function ($provide) {
                $provide.constant('ACTIONS', {
                    ACTION_A: 'ACTION_A'
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (store, type, payload) {

    }

    it('is a button styles liked a regular link', function () {

    });

    it('does a call to store.dispatch when clicked', function () {

    });
});