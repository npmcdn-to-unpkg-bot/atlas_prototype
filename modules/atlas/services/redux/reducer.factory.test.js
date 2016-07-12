describe('The reducer factory', function () {
    var reducer,
        urlReducers,
        detailReducers,
        layerSelectionReducers,
        mapReducers,
        pageReducers,
        searchReducers,
        straatbeeldReducers,
        inputState;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                urlReducers: {
                    ACTION_A: function () {}
                },
                detailReducers: {
                    ACTION_B: function () {}
                },
                layerSelectionReducers: {
                    ACTION_C: function () {}
                },
                mapReducers: {
                    ACTION_D: function () {}
                },
                pageReducers: {
                    ACTION_E: function () {}
                },
                searchReducers: {
                    ACTION_F: function () {}
                },
                straatbeeldReducers: {
                    ACTION_G: function () {}
                }
            }
        );

        angular.mock.inject(function (
            _reducer_,
            _urlReducers_,
            _detailReducers_,
            _layerSelectionReducers_,
            _mapReducers_,
            _pageReducers_,
            _searchReducers_,
            _straatbeeldReducers_,
            _DEFAULT_STATE_) {

            reducer = _reducer_;

            urlReducers = _urlReducers_;
            detailReducers = _detailReducers_;
            layerSelectionReducers = _layerSelectionReducers_;
            mapReducers = _mapReducers_;
            pageReducers = _pageReducers_;
            searchReducers = _searchReducers_;
            straatbeeldReducers = _straatbeeldReducers_;

            inputState = _DEFAULT_STATE_;
        });
    });

    it('groups all separate reducers and calls the appropriate one depening on the action type', function () {
        spyOn(urlReducers, 'ACTION_A').and.callThrough();
        spyOn(detailReducers, 'ACTION_B').and.callThrough();
        spyOn(layerSelectionReducers, 'ACTION_C').and.callThrough();
        spyOn(mapReducers, 'ACTION_D').and.callThrough();
        spyOn(pageReducers, 'ACTION_E').and.callThrough();
        spyOn(searchReducers, 'ACTION_F').and.callThrough();
        spyOn(straatbeeldReducers, 'ACTION_G').and.callThrough();

        reducer(inputState, {type: 'ACTION_A'});
        reducer(inputState, {type: 'ACTION_B'});
        reducer(inputState, {type: 'ACTION_C'});
        reducer(inputState, {type: 'ACTION_D'});
        reducer(inputState, {type: 'ACTION_E'});
        reducer(inputState, {type: 'ACTION_F'});
        reducer(inputState, {type: 'ACTION_G'});

        expect(urlReducers.ACTION_A).toHaveBeenCalled();
        expect(detailReducers.ACTION_B).toHaveBeenCalled();
        expect(layerSelectionReducers.ACTION_C).toHaveBeenCalled();
        expect(mapReducers.ACTION_D).toHaveBeenCalled();
        expect(pageReducers.ACTION_E).toHaveBeenCalled();
        expect(searchReducers.ACTION_F).toHaveBeenCalled();
        expect(straatbeeldReducers.ACTION_G).toHaveBeenCalled();
    });

    it('returns the oldState if the specified action type has no separate reducer', function () {
        //Note redux has some built-in action types that we can safely ignore.
        var output = reducer(inputState, {type: 'ACTION_H'});

        expect(output).toBe(inputState);
    });
});