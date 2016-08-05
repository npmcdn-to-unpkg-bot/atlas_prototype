describe('The map reducers', function () {
    var mapReducers,
        defaultState,
        countOwnPropCount = function(obj) {
            var ownProp = 0;
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    ownProp++;
                }
            }
            return ownProp;
        };

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_mapReducers_, _DEFAULT_STATE_) {
            mapReducers = _mapReducers_;
            defaultState = _DEFAULT_STATE_;
        });
    });

    describe('MAP_SET_BASELAYER', function () {
        it('changes the baseLayer', function () {
            var inputState = angular.copy(defaultState),
                output;

            output = mapReducers.MAP_SET_BASELAYER(inputState, 'luchtfoto_1915');
            expect(output.map.baseLayer).toBe('luchtfoto_1915');

            output = mapReducers.MAP_SET_BASELAYER(inputState, 'topografie');
            expect(output.map.baseLayer).toBe('topografie');
        });
    });

    describe('MAP_ADD_OVERLAY', function () {
        it('adds an overlay', function () {
            var inputState = angular.copy(defaultState),
                output, ownProp = 0;

            ownProp = countOwnPropCount(output.map.overlays);
            expect(ownProp).toBe(0);

            output = mapReducers.MAP_ADD_OVERLAY(inputState, 'meetbouten');
            ownProp = countOwnPropCount(output.map.overlays);
            expect(ownProp).toBe(1);
            expect(output.map.overlays.meetbouten).toBe(true);

            output = mapReducers.MAP_ADD_OVERLAY(output, 'parkeren');
            ownProp = countOwnPropCount(output.map.overlays);
            expect(ownProp).toBe(2);
            expect(output.map.overlays.parkeren).toBe(true);
        });
    });

    describe('MAP_REMOVE_OVERLAY', function () {
        it('removes an overlay', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.map.overlays = {'overlay_1':true, 'overlay_2':true, 'overlay_3':true};

            output = mapReducers.MAP_REMOVE_OVERLAY(inputState, 'overlay_2');
            expect(output.map.overlays).toEqual({'overlay_1':true, 'overlay_3':true});
        });

        it('will always keep the overlays state property an array (instead of null)', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.map.overlays = {'parkeren': true};

            output = mapReducers.MAP_REMOVE_OVERLAY(inputState, 'parkeren');
            expect(output.map.overlays).toEqual({});
        });
    });

    describe('MAP_PAN', function () {
        it('updates the viewCenter', function () {
            var inputState = angular.copy(defaultState),
                output;

            output = mapReducers.MAP_PAN(inputState, [51.1, 4.1]);
            expect(output.map.viewCenter).toEqual([51.1, 4.1]);

            output = mapReducers.MAP_PAN(inputState, [51.2, 4.2]);
            expect(output.map.viewCenter).toEqual([51.2, 4.2]);
        });
    });

    describe('MAP_ZOOM', function () {
        it('updates the zoom property', function () {
            var inputState = angular.copy(defaultState),
                output;

            output = mapReducers.MAP_ZOOM(inputState, 8);
            expect(output.map.zoom).toBe(8);

            output = mapReducers.MAP_ZOOM(inputState, 15);
            expect(output.map.zoom).toBe(15);

            output = mapReducers.MAP_ZOOM(inputState, 16);
            expect(output.map.zoom).toBe(16);
        });
    });
});