describe('The measure factory', function () {
    var L,
        measure,
        MEASURE_CONFIG,
        mockedMeasureControl,
        leafletControlContainer,
        statusBarContainer;

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

        leafletControlContainer = document.createElement('div');

        mockedMeasureControl = {
            addTo: function () {},
            getContainer: function () {
                return leafletControlContainer;
            }
        };

        //This factory assumes that an HTML element with class .js-leaflet-measure is present somewhere on the page
        statusBarContainer = document.createElement('div');
        statusBarContainer.className = 'js-leaflet-measure';

        document.body.appendChild(statusBarContainer);

        spyOn(L.Control, 'Measure').and.returnValue(mockedMeasureControl);
        spyOn(mockedMeasureControl, 'addTo');
    });

    afterEach(function () {
        document.body.removeChild(statusBarContainer);
    });

    it('adds a the measure control to the map', function () {
        measure.initialize('FAKE_LEAFLET_MAP');

        expect(L.Control.Measure).toHaveBeenCalledWith(MEASURE_CONFIG);
        expect(mockedMeasureControl.addTo).toHaveBeenCalledWith('FAKE_LEAFLET_MAP');
    });

    it('adds an extra CSS class to the Leaflet control of leaflet-measure', function () {
        expect(leafletControlContainer.className).not.toContain(' s-leaflet-measure');

        measure.initialize('FAKE_LEAFLET_MAP');
        expect(leafletControlContainer.className).toContain(' s-leaflet-measure');
    });

    it('moves the leaflet control to the status bar', function () {
        expect(document.querySelector('.s-leaflet-measure')).toBeNull();

        measure.initialize('FAKE_LEAFLET_MAP');

        //Making sure it's moved and not copied
        expect(document.querySelectorAll('.s-leaflet-measure').length).toBe(1);
        expect(document.querySelector('.s-leaflet-measure')).toBe(leafletControlContainer);

        //Check that it is indeed put in the status bar
        expect(document.querySelector('.js-leaflet-measure .s-leaflet-measure')).toBeDefined();
    });
});