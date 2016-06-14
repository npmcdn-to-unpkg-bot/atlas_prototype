describe('The reducer factory', function () {
    var reducer,
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
                detailReducers: {
                    ACTION_A: function () {}
                },
                layerSelectionReducers: {
                    ACTION_B: function () {}
                },
                mapReducers: {
                    ACTION_C: function () {}
                },
                pageReducers: {
                    ACTION_D: function () {}
                },
                searchReducers: {
                    ACTION_E: function () {}
                },
                straatbeeldReducers: {
                    ACTION_F: function () {}
                }
            }
        );

        angular.mock.inject(function (
            _reducer_,
            _detailReducers_,
            _layerSelectionReducers_,
            _mapReducers_,
            _pageReducers_,
            _searchReducers_,
            _straatbeeldReducers_,
            _DEFAULT_STATE_) {

            reducer = _reducer_;

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
        spyOn(detailReducers, 'ACTION_A').and.callThrough();
        spyOn(layerSelectionReducers, 'ACTION_B').and.callThrough();
        spyOn(mapReducers, 'ACTION_C').and.callThrough();
        spyOn(pageReducers, 'ACTION_D').and.callThrough();
        spyOn(searchReducers, 'ACTION_E').and.callThrough();
        spyOn(straatbeeldReducers, 'ACTION_F').and.callThrough();

        reducer(inputState, {type: 'ACTION_A'});
        reducer(inputState, {type: 'ACTION_B'});
        reducer(inputState, {type: 'ACTION_C'});
        reducer(inputState, {type: 'ACTION_D'});
        reducer(inputState, {type: 'ACTION_E'});
        reducer(inputState, {type: 'ACTION_F'});

        expect(detailReducers.ACTION_A).toHaveBeenCalledTimes(1);
        expect(layerSelectionReducers.ACTION_B).toHaveBeenCalled();
        expect(mapReducers.ACTION_C).toHaveBeenCalled();
        expect(pageReducers.ACTION_D).toHaveBeenCalled();
        expect(searchReducers.ACTION_E).toHaveBeenCalled();
        expect(straatbeeldReducers.ACTION_F).toHaveBeenCalled();
    });

    it('returns the oldState if the specified action type has no separate reducer', function () {
        //Note redux has some built-in action types that we can safely ignore.
        var output = reducer(inputState, {type: 'ACTION_G'});

        expect(output).toBe(inputState);
    });
});