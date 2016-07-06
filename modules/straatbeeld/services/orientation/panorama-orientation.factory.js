(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('panoramaOrientation', panoramaOrientationService);

    panoramaOrientationService.$inject = ['$state', 'angleConversion'];

    /*
     * Marzipano has no public events to subscribe to. This is a weak attempt to capture dragging and zooming.
     *
     * Zooming isn't captured by the mousemove event. When zooming the state won't get updated until the mouse moves
     * again.
     */
    function panoramaOrientationService ($state, angleConversion) {
        return {
            update: update
        };

        function update (panoramaViewer, panoramaState) {
            var cameraHeading,
                cameraYaw,
                cameraPitch,
                cameraFov;

            cameraYaw = panoramaViewer.view().yaw();
            cameraPitch = panoramaViewer.view().pitch();
            cameraFov = panoramaViewer.view().fov();

            cameraHeading = panoramaState.carOrientation.heading + cameraYaw;

            panoramaState.cameraOrientation.heading = cameraHeading;
            panoramaState.cameraOrientation.pitch = cameraPitch;
            panoramaState.cameraOrientation.fov = cameraFov;

            $state.go('app.straatbeeld', {
                heading: angleConversion.radiansToDegrees(cameraHeading),
                pitch: angleConversion.radiansToDegrees(cameraPitch),
                fov: angleConversion.radiansToDegrees(cameraFov)
            }, {
                location: 'replace',
                notify: false
            });
        }
    }
})();
