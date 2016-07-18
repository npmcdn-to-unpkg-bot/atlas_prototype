(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('polygonToPoint', polygonToPointFactory);

    polygonToPointFactory.$inject = [];

    function polygonToPointFactory () {
        return {
            calculateCenter: calculateCenter
        };

        function calculateCenter(location) {
            var x = [],
                xMin,
                xMax,
                xCenter,
                y = [],
                yMin,
                yMax,
                yCenter,
                locationLength;

            locationLength = location.length;

            for(var i=0 ; i<locationLength; i++){
                x.push(location[i][0]);
                y.push(location[i][1]);
            }

            xMin = getMin(x);
            xMax = getMax(x);
            yMin = getMin(y);
            yMax = getMax(y);

            xCenter = xMin + ((xMax - xMin) / 2);
            yCenter = yMin + ((yMax - yMin) / 2);

            return [xCenter, yCenter];
        }

        function getMin(array){
            var min;
            min = array.reduce(function(previous,current){
                return previous < current ? previous:current;
            });
            return min;
        }

        function getMax(array) {
            var max;
            max = array.reduce(function(previous,current){
                return previous > current ? previous:current;
            });
            return max;
        }

    }
})();