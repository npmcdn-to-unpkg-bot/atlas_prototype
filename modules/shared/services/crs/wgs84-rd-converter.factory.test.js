describe('The wgs84 Rd converter factory', function () {
  var wgs84RdConverter;

  beforeEach(function () {
    angular.mock.module('dpShared');

    angular.mock.inject(function (_wgs84RdConverter_) {
      wgs84RdConverter = _wgs84RdConverter_;
    });
  });

  xit('coverts an object with latitude and longitude to a string with RD coordinates', function () {
    //Nationaal monument, Dam
    expect(wgs84RdConverter.wgs84ToRd({latitude: 52.3728639, longitude: 4.8936044})).toBe('121386, 487335');

    //Weesperstraat 113
    expect(wgs84RdConverter.wgs84ToRd({latitude: 52.3670215, longitude: 4.8913113})).toBe('121225, 486686');
  });
});
