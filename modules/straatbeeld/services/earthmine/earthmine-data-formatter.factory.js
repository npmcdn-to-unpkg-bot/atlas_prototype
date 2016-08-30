(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('earthmineDataFormatter', earthmineDataFormatterService);

    earthmineDataFormatterService.$inject = ['angleConversion'];

    function earthmineDataFormatterService (angleConversion) {
        return {
            formatPanoramaState: formatPanoramaState
        };

        function formatPanoramaState (earthmineData) {
            return {
                id: Number(earthmineData['pano-id']),
                date: parseDate(earthmineData.timestamp),
                car: {
                    location: [earthmineData.location.lat, earthmineData.location.lon],
                    heading: angleConversion.degreesToRadians(earthmineData['pano-orientation'].yaw),
                    pitch: angleConversion.degreesToRadians(earthmineData['pano-orientation'].pitch)
                },
                hotspots: earthmineData.adjacent.map(function (hotspot) {
                    return {
                        id: Number(hotspot['pano-id']),
                        //relative to the normalized image
                        relativeLocation: {
                            yaw: angleConversion.degreesToRadians(hotspot.heading),
                            pitch: angleConversion.degreesToRadians(hotspot.pitch),
                            distance: hotspot.distance
                        }
                    };
                })
            };

            function parseDate (dateString) {
                var year,
                    month,
                    day;
                return new Date(dateString);
                /*
                year = Number(dateString.substr(0, 4));
                month = Number(dateString.substr(5, 2));
                day = Number(dateString.substr(8, 2));

                //Months are zero-based in JavaScript
                month--;

                return new Date(year, month, day);
                */
            }
        }
    }
})();
