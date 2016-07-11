(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = ['Marzipano', 'straatbeeldConfig', 'earthmine', 'angleConversion'];

    function marzipanoService (Marzipano, straatbeeldConfig, earthmine, angleConversion) {
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

        function loadScene (sceneId) {
            var view,
                viewLimiter,
                scene,
                imageSourceUrl;

            imageSourceUrl = earthmine.getImageSourceUrl(sceneId);

            viewLimiter = Marzipano.RectilinearView.limit.traditional(
                straatbeeldConfig.MAX_RESOLUTION,
                angleConversion.degreesToRadians(straatbeeldConfig.MAX_FOV)
            );

            view = new Marzipano.RectilinearView({}, viewLimiter);

            scene = viewer.createScene({
                source: Marzipano.ImageUrlSource.fromString(imageSourceUrl),
                geometry: new Marzipano.CubeGeometry(straatbeeldConfig.RESOLUTION_LEVELS),
                view: view,
                pinFirstLevel: true
            });

            //console.log(hotspots);

            scene.switchTo();
        }
    }
})();

