(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = ['Marzipano', 'straatbeeldConfig', 'earthmine', 'angleConversion', 'hotspotService'];

    function marzipanoService (Marzipano, straatbeeldConfig, earthmine, angleConversion, hotspotService) {
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
            viewer = new Marzipano.Viewer(domElement, {
                stageType: 'webgl',
                stage: {
                    preserveDrawingBuffer: true
                }
            });

            return viewer;
        }

        function loadScene (sceneId, image, car, camera, hotspots) {
            var view,
                viewLimiter,
                scene,
                imageSourceUrl;

            imageSourceUrl = image;//earthmine.getImageSourceUrl(sceneId);

            viewLimiter = Marzipano.RectilinearView.limit.traditional(
                straatbeeldConfig.MAX_RESOLUTION,
                angleConversion.degreesToRadians(straatbeeldConfig.MAX_FOV)
            );

            view = new Marzipano.RectilinearView({}, viewLimiter);

            scene = viewer.createScene({
                source: Marzipano.ImageUrlSource.fromString(imageSourceUrl),
                //geometry: new Marzipano.CubeGeometry(straatbeeldConfig.RESOLUTION_LEVELS),
                geometry: new Marzipano.EquirectGeometry([{ width: 8000 }]),
                view: view,
                pinFirstLevel: true
            });

            hotspots.sort(function (hotspotA, hotspotB) {
                return hotspotB.distance - hotspotA.distance;
            }).forEach(function (hotspot) {
                hotspotService.createHotspotTemplate(hotspot.pano_id, hotspot.distance, hotspot.heading, hotspot.pitch).then(function (template) {
                    var position = {
                        yaw: angleConversion.degreesToRadians(hotspot.heading),
                        //losse functie corrected pithc gront level ipv cametra hoogte + inverten
                        pitch: Math.atan(1 / hotspot.distance) - angleConversion.degreesToRadians(hotspot.pitch)
                    };

                    scene.hotspotContainer().createHotspot(
                        template,
                        position
                    );
                });
            });

            //Set orientation
            view.setYaw(car.heading);
            view.setPitch(camera.pitch);
            view.setFov(camera.fov || straatbeeldConfig.DEFAULT_FOV);

            scene.switchTo();
        }
    }
})();

