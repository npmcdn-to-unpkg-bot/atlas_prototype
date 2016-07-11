(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = ['Marzipano', 'straatbeeldConfig', 'earthmine', 'angleConversion', 'hotspotService'];

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

        function loadScene (sceneId, car, hotspots) {
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

            console.log(car, hotspots);
            /*
            hotspots.forEach(function (hotspot) {
                var position = hotspotService.calculateHotspotPosition(camera, hotspot);
                console.log(position);
                hotspotService.createHotspotTemplate(hotspot, camera).then(function (template) {
                    scene.hotspotContainer().createHotspot(
                        template,
                        position,
                        straatbeeldConfig.HOTSPOT_PERSPECTIVE
                    );
                });
            });
            */
            scene.switchTo();
        }
    }
})();

