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

            view = new Marzipano.RectilinearView({}, viewLimiter);

            scene = viewer.createScene({
                source: Marzipano.ImageUrlSource.fromString(imageSourceUrl),
                geometry: new Marzipano.CubeGeometry(STRAATBEELD_CONFIG.RESOLUTION_LEVELS),
                view: view,
                pinFirstLevel: true
            });

            if (camera.heading) {
                view.setYaw(camera.heading - camera.heading);
            }

            if (camera.pitch) {
                view.setPitch(camera.pitch);
            }

            if (camera.fov) {
                view.setFov(camera.fov);
            }

            /*
            camera.hotspots.forEach(function (hotspot) {
                addHotSpot(scene, camera, hotspot);
            });
            */
            scene.switchTo();
        }

        function addHotSpot (scene, camera, hotspot) {
            var targetSceneId,
                distance,
                position;

            targetSceneId = hotspot.id;
            distance = hotspot.relativeLocation.distance;
            position = hotspotService.calculateHotspotPosition(camera, hotspot);

            hotspotService.createHotspot(targetSceneId, distance, camera).then(function (template) {
                scene.hotspotContainer().createHotspot(template, position, STRAATBEELD_CONFIG.HOTSPOT_PERSPECTIVE);
            });
        }
    }
})();

