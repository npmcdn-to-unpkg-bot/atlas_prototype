describe('The coordinates filter', function () {
    var coordinates;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                crsConverter: {
                    wgs84ToRd: function () {
                        return [123456, 654123];
                    }
                }
            }
        );

        angular.mock.inject(function (_coordinatesFilter_) {
            coordinates = _coordinatesFilter_;
        });
    });

    it('returns a string with the RD and latitude/longitude coordinates', function () {
        expect(coordinates([52.123456, 4.456789])).toBe('123456, 654123 (52.123456, 4.456789)');
    });

    it('rounds latitude and longitude down to 6 decimals', function () {
        expect(coordinates([52.1234565, 4.4567894])).toBe('123456, 654123 (52.123457, 4.456789)');
    });
});