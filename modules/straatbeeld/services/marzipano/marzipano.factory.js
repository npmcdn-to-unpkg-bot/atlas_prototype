(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = [
        'Marzipano',
        'STRAATBEELD_CONFIG',
        'earthmineService',
        'hotspotService',
        'angleConversion'
    ];

    function marzipanoService (
        Marzipano,
        STRAATBEELD_CONFIG,
        earthmineService,
        hotspotService,
        angleConversion) {

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

        function loadScene (sceneId, camera) {
            var view,
                viewLimiter,
                scene,
                imageSourceUrl,
                cameraYaw;

            imageSourceUrl = earthmineService.getImageSourceUrl(sceneId);

            viewLimiter = Marzipano.RectilinearView.limit.traditional(
                STRAATBEELD_CONFIG.MAX_RESOLUTION,
                angleConversion.degreesToRadians(STRAATBEELD_CONFIG.MAX_FOV)
            );

            view = new Marzipano.RectilinearView({
                yaw: 0,
                pitch: 0,
                fov: 70
            }, viewLimiter);

            scene = viewer.createScene({
                source: Marzipano.ImageUrlSource.fromString(imageSourceUrl),
                geometry: new Marzipano.CubeGeometry(STRAATBEELD_CONFIG.RESOLUTION_LEVELS),
                view: view,
                pinFirstLevel: true
            });

            if (camera.heading) {
                cameraYaw = camera.heading - camera.heading;

                view.setYaw(cameraYaw);
            }

            if (camera.pitch) {
                view.setPitch(camera.pitch);
            }

            if (camera.fov) {
                view.setFov(camera.fov);
            }
            /*
            panoramaState.hotspots.forEach(function (hotspot) {
                addHotSpot(scene, panoramaState, hotspot);
            });
            */
            scene.switchTo();
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

