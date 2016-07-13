describe('The wgs84 Rd converter factory', function () {
    var wgs84RdConverter;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_wgs84RdConverter_) {
            wgs84RdConverter = _wgs84RdConverter_;
        });
    });

    it('coverts an wgs84 array to an array with RD coordinates', function () {
        //Nationaal monument, Dam
        expect(wgs84RdConverter.wgs84ToRd([52.372925, 4.893168])).toEqual([121356.29652982563, 487342.3555735912]);

        //Weesperstraat 113
        expect(wgs84RdConverter.wgs84ToRd([52.362922, 4.907101])).toEqual([122297.74628058505, 486223.01434200455]);
    });

    it('coverts an rd array to an array with wgs84 coordinates', function () {
        //Nationaal monument, Dam
        expect(wgs84RdConverter.rdToWgs84([121386, 487335])).toEqual([52.3728607164929, 4.893604897973255]);

        //Weesperstraat 113
        expect(wgs84RdConverter.rdToWgs84([122295, 486219])).toEqual([52.362885762452215, 4.907061074797828]);
    });
});