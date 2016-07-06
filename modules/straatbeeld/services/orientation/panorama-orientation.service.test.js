xdescribe('The panorama-orientation service', function () {
  var $state,
    panoramaOrientation,
    mockedPanoramaViewer = {
      view: function () {
        return {
          yaw: function () {
            return 4;
          },
          pitch: function () {
            return 5;
          },
          fov: function () {
            return 6;
          }
        };
      }
    },
    mockedPanoramaState = {
      carOrientation: {
        heading: 1
      },
      cameraOrientation: {}
    };

  beforeEach(function () {
    angular.mock.module(
      'atlasApp',
      'atlasApp.straatbeeld',
      {
        angleConversion: {
          radiansToDegrees: function (radians) {
            return radians * 2;
          }
        }
      }
    );

    angular.mock.inject(function (_$state_, _panoramaOrientation_) {
      $state = _$state_;
      panoramaOrientation = _panoramaOrientation_;
    });
  });

  it('updates the panorama state', function () {
    var panoramaState = angular.copy(mockedPanoramaState);

    panoramaOrientation.update(mockedPanoramaViewer, panoramaState);

    expect(panoramaState.cameraOrientation.heading).toBe(5);
    expect(panoramaState.cameraOrientation.pitch).toBe(5);
    expect(panoramaState.cameraOrientation.fov).toBe(6);
  });

  it('updates the URL on mousemove', function () {
    var panoramaState = angular.copy(mockedPanoramaState);

    spyOn($state, 'go');
    panoramaOrientation.update(mockedPanoramaViewer, panoramaState);

    expect($state.go).toHaveBeenCalledWith(
      'app.straatbeeld',
      {
        heading: 10,
        pitch: 10,
        fov: 12
      }, {
        location: 'replace',
        notify: false
      }
    );
  });
});
