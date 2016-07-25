(function() {
    angular
        .module('dpMap')
        .directive('dpMapStatusbar', dpMapStatusbar);

    dpMapStatusbar.$inject = [
        'layers',
        'zoom'
    ];

   function dpMapStatusbar(layers, zoom) {

        console.log(zoom);
        console.log(layers);
       return {
            restrict: 'E',
            scope: {
                mapState: '=',
                markers: '='
            },
            templateUrl: 'modules/map/components/statusbar/statusbar.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            console.log(scope);
            console.log(element);
            console.log('link!');
        }
    }
})();
