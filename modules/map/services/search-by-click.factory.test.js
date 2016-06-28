describe('The searchByClick factory', function () {
    var searchByClick,
        store,
        ACTIONS,
        mockedLeafletMap;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                store: {
                    dispatch: function () {}
                }
            }
        );

        angular.mock.inject(function (_searchByClick_, _store_, _ACTIONS_) {
            searchByClick = _searchByClick_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        mockedLeafletMap = document.createElement('button');
    });

    it('dispatches an action when the map is clicked', function () {
        searchByClick.initialize(mockedLeafletMap);

        spyOn(store, 'dispatch');

        //Mock the Leaflet click event
        angular.element(mockedLeafletMap).triggerHandler('click', {
            latlng: {
                lat: 52.124,
                lng: 4.788
            }
        });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK,
            payload: [52.124, 4.788]
        });
    });
});