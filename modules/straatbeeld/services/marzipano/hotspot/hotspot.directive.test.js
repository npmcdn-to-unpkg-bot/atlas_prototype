xdescribe('The dp-hotspot directive', function () {
  var $compile,
    $rootScope,
    $q,
    earthmineService,
    marzipanoService,
    mockedPanoramaState = {
      id: 1,
      date: 'fakeDate_1',
      location: 'fakeLocation_1',
      carOrientation: 'fakeOrientation_1',
      hotspots: ['fakeHotspot_1', 'fakeHotspot_2']
    },
    mockedEarthmineData = {
      id: 2,
      date: 'fakeDate_2',
      location: 'fakeLocation_2',
      carOrientation: 'fakeOrientation_2',
      hotspots: ['fakeHotspot_3', 'fakeHotspot_4']
    };

  beforeEach(function () {
    angular.mock.module(
      'atlasApp',
      'atlasApp.straatbeeld'
    );

    angular.mock.inject(function (_$compile_, _$rootScope_, _$q_, _earthmineService_, _marzipanoService_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $q = _$q_;
      earthmineService = _earthmineService_;
      marzipanoService = _marzipanoService_;
    });
  });

  function getDirective (sceneId, distance, panoramaState) {
    var directive,
      element,
      scope;

    element = document.createElement('dp-hotspot');
    element.setAttribute('scene-id', sceneId);
    element.setAttribute('distance', distance);
    element.setAttribute('panorama-state', 'panoramaState');

    scope = $rootScope.$new();
    scope.panoramaState = panoramaState;

    directive = $compile(element)(scope);
    scope.$digest();

    return directive;
  }

  it('creates a button with dimensions based on the distance', function () {
    var directive;

    directive = getDirective(1, 5, mockedPanoramaState);
    expect(directive.find('button').attr('style')).toContain('width: 55px; height: 55px;');

    directive = getDirective(1, 10, mockedPanoramaState);
    expect(directive.find('button').attr('style')).toContain('width: 50px; height: 50px;');
  });

  it('buttons have a minimum size regardless of the distance', function () {
    var directive = getDirective(1, 1000, mockedPanoramaState);
    expect(directive.find('button').attr('style')).toContain('width: 30px; height: 30px;');
  });

  it('clicking the hotspot will load a new scene with updated panoramaState data', function () {
    var directive,
      sceneId;

    spyOn(earthmineService, 'getImageDataById').and.callFake(function () {
      var q = $q.defer();

      q.resolve(mockedEarthmineData);

      return q.promise;
    });

    spyOn(marzipanoService, 'loadScene');

    sceneId = 12345;
    directive = getDirective(sceneId, 10, mockedPanoramaState);
    directive.find('button').click();

    expect(earthmineService.getImageDataById).toHaveBeenCalledWith(sceneId);
    expect(marzipanoService.loadScene).toHaveBeenCalledWith(
      {
        id: 2,
        date: 'fakeDate_2',
        location: 'fakeLocation_2',
        carOrientation: 'fakeOrientation_2',
        hotspots: ['fakeHotspot_3', 'fakeHotspot_4']
      }
    );
  });
});
