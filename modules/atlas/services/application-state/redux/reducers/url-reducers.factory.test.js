describe('The urlReducers factory', function () {
    describe('URL_CHANGE', function () {
        it('returns the default state when the payload is empty', function () {

        });

        describe('search', function () {
            it('can set a query', function () {

            });

            it('can set a location', function () {

            });

            it('can be null', function () {

            });
        });

        describe('map', function () {
            it('sets a baseLayer', function () {

            });

            it('can set overlays', function () {
                //Test 0, 1 & 2
            });

            it('sets the center', function () {

            });

            it('sets a zoom level', function () {

            });

            it('can set a highlight', function () {

            });

            it('preserves the showLayerSelection status from the previous state', function () {

            });

            it('sets the isLoading to true if detail or straatbeeld has changed', function () {

            });
        });

        describe('detail', function () {
            it('can set a detail uri', function () {

            });

            it('sets isLoading to true if the detail uri has changed', function () {

            });
        });

        describe('straatbeeld', function () {
            it('can set a straatbeeld ID, heading, pitch and fov', function () {

            });

            it('resets the location and changes isLoading to true if the straatbeeld ID has changed', function () {

            });
        });
    });
});