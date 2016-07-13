// (function () {
//     'use strict';

//     angular
//         .module('atlasDetail')
//         .directive('atlasStraatbeeld', atlasStraatbeeldDirective);

//     function atlasStraatbeeldDirective () {
//         return {
//             restrict: 'E',
//             scope: {
//                 apiData: '=',
//             },
//             templateUrl: 'modules/detail/components/straatbeeld/straatbeeld.html',
//             controller: AtlasStraatbeeldController,
//             controllerAs: 'vm',
//             bindToController: true
//         };
//     }

//     AtlasStraatbeeldController.$inject = ['api', 'environment', 'geojsonCenter', 'wgs84RdConverter'];

//     function AtlasStraatbeeldController (api, environment, geojsonCenter, wgs84RdConverter) {
//         var vm = this,
//             center;

//         console.log(vm.apiData.results);

//         if(vm.apiData.results && vm.apiData.results.geometrie && vm.apiData.results.geometrie.coordinates[0][0]){
//             vm.imageUrl = getImageUrl(vm.apiData.results.geometrie.coordinates);
//             console.log(vm.imageUrl);
//         } else if(vm.apiData.results.index_letter === 'A'){
//             api.getByUrl(vm.apiData.results.betrokken_bij.href).then(function (response) {
//                 vm.imageUrl = getImageUrl(response.geometrie.coordinates);
//             });
//         } else if(vm.apiData.results.nummeraanduidingidentificatie){
//             var object = vm.apiData.results.type;
//             object = object.toLowerCase();
//             api.getByUrl(vm.apiData.results[object]).then(function (response) {
//                 vm.imageUrl = getImageUrl(response.geometrie.coordinates);
//                 console.log(vm.imageUrl);
//             });
//         } else if (vm.apiData.results && vm.apiData.results.geometrie) {
//             center = convertWgs84Rd(vm.apiData.results.geometrie.coordinates);
//             vm.imageUrl = getImageUrl(center);
//             console.log(vm.imageUrl);
//         }

//         function getImageUrl(coordinates){
//             var center,
//             centerWgs84;
//             center = geojsonCenter.getCenter(coordinates);
//             centerWgs84 = convertWgs84Rd(coordinates);
//             return environment.PANO_VIEW_PROXY +
//                         '?lon=' + centerWgs84[0] +
//                         '&lat=' + centerWgs84[1] +
//                         '&width=240&height=144';
//         }

//         function convertWgs84Rd(coordinates) {
//             return wgs84RdConverter.rdToWgs84(coordinates);
//         }
//     }
// })();

(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasStraatbeeld', atlasStraatbeeldDirective);

    function atlasStraatbeeldDirective () {
        return {
            restrict: 'E',
            scope: {
                apiData: '=',
            },
            templateUrl: 'modules/detail/components/straatbeeld/straatbeeld.html',
            controller: AtlasStraatbeeldController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    AtlasStraatbeeldController.$inject = ['api', 'environment', 'geojsonCenter', 'wgs84RdConverter'];

    function AtlasStraatbeeldController (api, environment, geojsonCenter, wgs84RdConverter) {
        var vm = this,
            data = vm.apiData.results,
            geometrie = vm.apiData.results.geometrie,
            centerWgs84;
console.log(geometrie);
console.log(data);
        getImageUrl();

        function getImageUrl() {
            return getGeometry().then(function(response){
                console.log(response);
                centerWgs84 = wgs84RdConverter.rdToWgs84(response);

                vm.imageUrl = environment.PANO_VIEW_PROXY +
                            '?lon=' + centerWgs84[0] +
                            '&lat=' + centerWgs84[1] +
                            '&width=240&height=144';
            });
        }
        function getGeometry () {
            if(geometrie && geometrie.type === 'MultiPolygon' || 'Polygon'){
                return geojsonCenter.getCenter(geometrie.coordinates);
            } else if(geometrie && geometrie.type === 'Point'){
                return geometrie.coordinates;
            } else if (data.index_letter === 'A') {
                return api.getByUrl(data.betrokken_bij.href).then(getGeometry);
            } else if (data.nummeraanduidingidentificatie) {
                var object = data.type;
                object = object.toLowerCase();
                return api.getByUrl(data[object]).then(getGeometry);
            }
        }

        // function getImageUrl() {
        //     if(geometrie && geometrie.type === 'MultiPolygon'){
        //         center = geojsonCenter.getCenter(geometrie.coordinates);
        //     } else if(data.index_letter === 'A') {
        //         var test = api.getByUrl(data.betrokken_bij.href);
        //         center = test.geometrie.coordinates;
        //         console.log(test);
        //     } else if(data.nummeraanduidingidentificatie) {
        //         var object = data.type;
        //         object = object.toLowerCase();
        //         center = api.getByUrl(data[object]).geometrie.coordinates;
        //         console.log(center);
        //     } else {
        //         center = geometrie.coordinates;
        //     }

    }
})();