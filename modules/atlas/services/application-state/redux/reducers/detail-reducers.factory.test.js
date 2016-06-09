describe('The detailReducers factory', function () {
    var detailReducers;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_detailReducers_) {
            detailReducers = _detailReducers_;
        });
    });

    describe('FETCH_DETAIL', function () {
        it('sets the URI for detail', function () {
            console.log(detailReducers);
        });

        it('sets loading indicators for map and detail', function () {

        });

        it('removes highlights from the map', function () {

        });

        it('disables layer selection, search, page and straatbeeld', function () {

        });
    });

    describe('SHOW_DETAIL', function () {
        it('centers the map', function () {

        });

        it('highlights an object on the map', function () {

        });

        it('removes loading indicators for map and detail', function () {

        });
    });
});