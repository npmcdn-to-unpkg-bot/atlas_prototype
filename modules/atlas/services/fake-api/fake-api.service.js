(function () {
    'use strict';

    angular
        .module('atlas')
        .service('fakeApi', fakeApiService);

    fakeApiService.$inject = ['$timeout', 'store', 'ACTIONS'];

    function fakeApiService ($timeout, store, ACTIONS) {
        return {
            initialize: initializeMocks
        };

        function initializeMocks () {
            store.subscribe(doFakeDataCall);

            function doFakeDataCall () {
                var state = store.getState();

                if (state.detail && state.detail.isLoading) {
                    $timeout(function () {
                        var location,
                            highlight;

                        if (state.detail.uri === 'bag/verblijfsobject/03630001958552') {
                            location = [52.32226293447365, 4.9794013795430745];
                            highlight = 'GeoJSON Point at 52.32226293447365, 4.9794013795430745';
                        } else if (state.detail.uri === 'bag/openbareruimte/03630000001020') {
                            location = [52.35574887521402, 4.997074072623519];
                            highlight = 'GeoJSON Polygon for Maria Austriastraat (openbare ruimte)';
                        } else if (state.detail.uri === 'gebieden/buurt/03630000000583') {
                            location = [52.3788266489935, 4.924849634533546];
                            highlight = 'GeoJSON Polygon for Java-eiland (buurt)';
                        } else {
                            location = [52.378086874951386, 4.922568081008677];
                            highlight = 'GeoJSON Polygon for Jan Schaeferbrug (openbare ruimte)';
                        }

                        store.dispatch({
                            type: ACTIONS.SHOW_DETAIL,
                            payload: {
                                location: location,
                                highlight: highlight
                            }
                        });
                    }, 2000);
                }
            }
        }
    }
})();