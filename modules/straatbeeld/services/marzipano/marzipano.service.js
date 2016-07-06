(function () {
  'use strict';

  angular
    .module('dpStraatbeeld')
    .service('marzipanoService', marzipanoService);

  marzipanoService.$inject = [
    '$state',
    'Marzipano',
    'STRAATBEELD_CONFIG',
    'earthmineService',
    'hotspotService',
    'angleConversion'
  ];

  function marzipanoService ($state, Marzipano, STRAATBEELD_CONFIG, earthmineService, hotspotService, angleConversion) {
    var viewer;

    return {
      initialize: initialize,
      loadScene: loadScene
    };

    /*
     * @param {Object} domElement - An HtmlNode
     *
     * @returns {Object} - A Marzipano Viewer instance
     */
    function initialize (domElement) {
      viewer = new Marzipano.Viewer(domElement);

      return viewer;
    }

    function loadScene (panoramaState) {
      var view,
        viewLimiter,
        scene,
        sceneId,
        imageSourceUrl,
        cameraYaw;

      sceneId = panoramaState.id;
      imageSourceUrl = earthmineService.getImageSourceUrl(sceneId);

      viewLimiter = Marzipano.RectilinearView.limit.traditional(
        STRAATBEELD_CONFIG.MAX_RESOLUTION,
        angleConversion.degreesToRadians(STRAATBEELD_CONFIG.MAX_FOV)
      );

      view = new Marzipano.RectilinearView(panoramaState.carOrientation, viewLimiter);

      scene = viewer.createScene({
        source: Marzipano.ImageUrlSource.fromString(imageSourceUrl),
        geometry: new Marzipano.CubeGeometry(STRAATBEELD_CONFIG.RESOLUTION_LEVELS),
        view: view,
        pinFirstLevel: true
      });

      if (panoramaState.cameraOrientation.heading) {
        cameraYaw = panoramaState.cameraOrientation.heading - panoramaState.carOrientation.heading;

        view.setYaw(cameraYaw);
      }

      if (panoramaState.cameraOrientation.pitch) {
        view.setPitch(panoramaState.cameraOrientation.pitch);
      }

      if (panoramaState.cameraOrientation.fov) {
        view.setFov(panoramaState.cameraOrientation.fov);
      }

      panoramaState.hotspots.forEach(function (hotspot) {
        addHotSpot(scene, panoramaState, hotspot);
      });

      scene.switchTo();

      $state.go('app.straatbeeld', {
        id: sceneId,
        plat: null,
        plon: null
      }, {
        location: 'replace',
        notify: false
      });
    }

    function addHotSpot (scene, panoramaState, hotspot) {
      var targetSceneId,
        distance,
        position;

      targetSceneId = hotspot.id;
      distance = hotspot.relativeLocation.distance;
      position = hotspotService.calculateHotspotPosition(panoramaState, hotspot);

      hotspotService.createHotspot(targetSceneId, distance, panoramaState).then(function (template) {
        scene.hotspotContainer().createHotspot(template, position, STRAATBEELD_CONFIG.HOTSPOT_PERSPECTIVE);
      });
    }
  }
})();

