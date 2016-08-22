describe('The measure factory', function () {
    var L,
        measure,
        MEASURE_CONFIG,
        mockedMeasureControl;

    beforeEach(function () {
        angular.mock.module(
            'dpMap'
        );

        angular.mock.inject(function (_L_, _measure_, _MEASURE_CONFIG_) {
            L = _L_;
            measure = _measure_;
            MEASURE_CONFIG = _MEASURE_CONFIG_;
        });

        L.Control.Measure = function () {};

        mockedMeasureControl = {
            addTo: function () {}
        };

        spyOn(L.Control, 'Measure').and.returnValue(mockedMeasureControl);
        spyOn(mockedMeasureControl, 'addTo');
    });

    it('adds a the measure control to the map', function () {
        measure.initialize('FAKE_LEAFLET_MAP');

        expect(L.Control.Measure).toHaveBeenCalledWith(MEASURE_CONFIG);
        expect(mockedMeasureControl.addTo).toHaveBeenCalledWith('FAKE_LEAFLET_MAP');
    });
});