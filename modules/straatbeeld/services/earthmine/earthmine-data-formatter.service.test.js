xdescribe('The earthmine-data-formatter service', function () {
  var earthmineDataFormatter,
    input,
    output;

  beforeEach(function () {
    angular.mock.module(
      'atlasApp',
      'atlasApp.straatbeeld'
    );

    angular.mock.inject(function (_earthmineDataFormatter_) {
      earthmineDataFormatter = _earthmineDataFormatter_;
    });

    input = {
      'pano-id': '1000014016370',
      timestamp: '2012-07-15 13:27:32',
      location: {
        lon: 4.9219423482803,
        lat: 52.37672892191
      },
      'pano-orientation': {
        yaw: 11.744057655334,
        pitch: 3.5506110191345
      },
      connections: [
        {
          'relative-location': {
            yaw: -168.26495451758,
            pitch: -0.46371610026191,
            distance: 5.4100728048995
          },
          'pano-id': '1000014016369'
        },
        {
          'relative-location': {
            yaw: 14.56514641488,
            pitch: 0.3063689539213,
            distance: 5.4159216166952
          },
          'pano-id': '1000014016371'
        }
      ]
    };

    output = earthmineDataFormatter.formatPanoramaState(input);
  });

  it('restructes data from earthmine into a panoramaState', function () {
    expect(output.id).toBeDefined();
    expect(output.date).toBeDefined();
    expect(output.location.latitude).toBe(52.37672892191);
    expect(output.location.longitude).toBe(4.9219423482803);
    expect(angular.isNumber(output.carOrientation.heading)).toBe(true);
    expect(angular.isNumber(output.carOrientation.pitch)).toBe(true);

    expect(output.hotspots[0].id).toBe('1000014016369');
    expect(angular.isNumber(output.hotspots[0].relativeLocation.yaw)).toBe(true);
    expect(angular.isNumber(output.hotspots[0].relativeLocation.pitch)).toBe(true);
    expect(output.hotspots[0].relativeLocation.distance).toBe(5.4100728048995);

    expect(output.hotspots[1].id).toBe('1000014016371');
    expect(angular.isNumber(output.hotspots[1].relativeLocation.yaw)).toBe(true);
    expect(angular.isNumber(output.hotspots[1].relativeLocation.pitch)).toBe(true);
    expect(output.hotspots[1].relativeLocation.distance).toBe(5.4159216166952);
  });

  it('converts the id from a String to a Number', function () {
    expect(angular.isString(input['pano-id'])).toBe(true);
    expect(input['pano-id']).toBe('1000014016370');

    expect(angular.isNumber(output.id)).toBe(true);
    expect(output.id).toBe(1000014016370);
  });

  it('converts the date from a String to a Date object', function () {
    expect(angular.isString(input.timestamp)).toBe(true);

    expect(angular.isDate(output.date)).toBe(true);
    expect(output.date.getFullYear()).toBe(2012);
    expect(output.date.getMonth()).toBe(6);
    expect(output.date.getDate()).toBe(15);
  });

  it('converts degrees to radians for all yaw and pitch parameters', function () {
    expect(input['pano-orientation'].yaw).toBe(11.744057655334);
    expect(input['pano-orientation'].pitch).toBe(3.5506110191345);

    expect(input['connections'][0]['relative-location'].yaw).toBe(-168.26495451758);
    expect(input['connections'][0]['relative-location'].pitch).toBe(-0.46371610026191);

    expect(input['connections'][1]['relative-location'].yaw).toBe(14.56514641488);
    expect(input['connections'][1]['relative-location'].pitch).toBe(0.3063689539213);

    expect(output['carOrientation'].heading.toFixed(10)).toBe('0.2049724736');
    expect(output['carOrientation'].pitch.toFixed(10)).toBe('0.0619698527');

    expect(output['hotspots'][0].relativeLocation.yaw).toBe(-2.936777472050278);
    expect(output['hotspots'][0].relativeLocation.pitch).toBe(-0.008093372744078469);

    expect(output['hotspots'][1].relativeLocation.yaw).toBe(0.254209760974704);
    expect(output['hotspots'][1].relativeLocation.pitch).toBe(0.005347146971817477);
  });
});
