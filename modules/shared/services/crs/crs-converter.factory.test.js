describe('The crsConverter factory', function () {
    var crsConverter;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_crsConverter_) {
            crsConverter = _crsConverter_;
        });
    });

    it('coverts an wgs84 array to an array with RD coordinates', function () {
        var output;

        //Nationaal monument, Dam
        output = crsConverter.wgs84ToRd([52.372925, 4.893168]);

        expect(output.length).toBe(2);
        expect(angular.isNumber(output[0])).toBe(true);
        expect(angular.isNumber(output[1])).toBe(true);
        expect(output[0].toFixed(4)).toBe('121356.2965');
        expect(output[1].toFixed(4)).toBe('487342.3556');

        //Weesperstraat 113
        output = crsConverter.wgs84ToRd([52.362922, 4.907101]);

        expect(output.length).toBe(2);
        expect(angular.isNumber(output[0])).toBe(true);
        expect(angular.isNumber(output[1])).toBe(true);
        expect(output[0].toFixed(4)).toBe('122297.7463');
        expect(output[1].toFixed(4)).toBe('486223.0143');
    });

    it('coverts an rd array to an array with wgs84 coordinates', function () {
        var output;

        //Nationaal monument, Dam
        output = crsConverter.rdToWgs84([121386, 487335]);

        expect(output.length).toBe(2);
        expect(angular.isNumber(output[0])).toBe(true);
        expect(angular.isNumber(output[1])).toBe(true);
        expect(output[0].toFixed(4)).toBe('52.3729');
        expect(output[1].toFixed(4)).toBe('4.8936');

        //Weesperstraat 113
        output = crsConverter.rdToWgs84([122295, 486219]);

        expect(output.length).toBe(2);
        expect(angular.isNumber(output[0])).toBe(true);
        expect(angular.isNumber(output[1])).toBe(true);
        expect(output[0].toFixed(4)).toBe('52.3629');
        expect(output[1].toFixed(4)).toBe('4.9071');
    });
});