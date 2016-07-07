(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = ['Marzipano', 'STRAATBEELD_CONFIG', 'earthmineService', 'angleConversion'];

    function marzipanoService (Marzipano, STRAATBEELD_CONFIG, earthmineService, angleConversion) {
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
        }

        function loadScene (sceneId, heading, pitch, fov) {
            var view,
                viewLimiter,
                scene,
                imageSourceUrl;

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

            if (heading) {
                view.setYaw(heading - heading);
            }

            if (pitch) {
                view.setPitch(pitch);
            }

            if (fov) {
                view.setFov(fov);
            }

            scene.switchTo();
        }
    }
})();

