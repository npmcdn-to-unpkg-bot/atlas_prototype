describe('The wgs84ToRd filter', function () {
  var wgs84ToRdFilter;

  beforeEach(function () {
    angular.mock.module('dpMap');

    angular.mock.inject(function (_wgs84ToRdFilter_) {
      wgs84ToRdFilter = _wgs84ToRdFilter_;
    });
  });

  it('coverts an object with latitude and longitude to a string with RD coordinates', function () {
    //Nationaal monument, Dam
    expect(wgs84ToRdFilter({latitude: 52.3728639, longitude: 4.8936044})).toBe('121386, 487335');

    //Weesperstraat 113
    expect(wgs84ToRdFilter({latitude: 52.3670215, longitude: 4.8913113})).toBe('121225, 486686');
  });
});
