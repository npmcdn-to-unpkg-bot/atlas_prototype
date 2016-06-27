describe('The atlas-search directive', function () {
    var $compile,
        $rootScope,
        $timeout,
        $q,
        autocompleteData,
        fakeAutocompleteData,
        store,
        ACTIONS,
        fakeFormSubmitEvent = {
            preventDefault: function () {}
        };

    beforeEach(function () {
        angular.mock.module(
            'atlasHeader',
            {
                store: {
                    dispatch: function () {}
                }
            }, {
                autocompleteData: {
                    search: function (query) {
                        var q = $q.defer();

                        q.resolve(fakeAutocompleteData[query]);

                        return q.promise;
                    },
                    cancel: function () {},
                    getSuggestionByIndex: function (searchResults, index) {
                        var fakeSuggestions = [
                            {
                                query: 'Suggestion A1',
                                uri: 'blah-blah/1'
                            }, {
                                query: 'Suggestion A2',
                                uri: 'blah-blah/2'
                            }, {
                                query: 'Suggestion B1',
                                uri: 'something/789'
                            }
                        ];

                        return fakeSuggestions[index];
                    }
                }
            }
        );

        angular.mock.inject(
            function (_$compile_, _$rootScope_, _$timeout_, _$q_, _autocompleteData_, _store_, _ACTIONS_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $timeout = _$timeout_;
                $q = _$q_;
                autocompleteData = _autocompleteData_;
                store = _store_;
                ACTIONS = _ACTIONS_;
            }
        );

        fakeAutocompleteData = {
            'query without suggestions': {
                count: 0,
                data: []
            },
            'query with suggestions': {
                count: 3,
                data: [
                    {
                        label: 'Category A',
                        content: [
                            {
                                _display: 'Suggestion A1 (extra information)',
                                query: 'Suggestion A1',
                                uri: 'blah-blah/1',
                                index: 0
                            }, {
                                _display: 'Suggestion A2 (more information)',
                                query: 'Suggestion A2',
                                uri: 'blah-blah/2',
                                index: 1
                            }
                        ]
                    }, {
                        label: 'Category B',
                        content: [
                            {
                                _display: 'Suggestion B1',
                                query: 'Suggestion B1',
                                uri: 'something/789',
                                index: 2
                            }
                        ]
                    }
                ]
            }
        };
    });

    function getDirective (query) {
        var directive,
            element,
            scope;

        element = document.createElement('atlas-search');
        element.setAttribute('query', query || '');

        scope = $rootScope.$new();
        
        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('optionally fills the searchbox with a query', function () {
        var directive;

        //Without a query
        directive = getDirective();
        expect(directive[0].querySelector('.js-search-input').value).toBe('');

        //With a query
        directive = getDirective('query without suggestions');
        expect(directive[0].querySelector('.js-search-input').value).toBe('query without suggestions');
    });

    it('can search (without using a suggestion from autocomplete)', function () {
        var directive = getDirective(),
            scope = directive.isolateScope();

        spyOn(store, 'dispatch');

        //Set a query
        scope.query = 'query without suggestions';

        //Submit the form
        scope.formSubmit(fakeFormSubmitEvent);

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SHOW_SEARCH_RESULTS_BY_QUERY,
            payload: 'query without suggestions'
        });
    });

    describe('has autocomplete suggestions', function () {
        it('which are loaded when typing', function () {
            var directive = getDirective(),
                scope = directive.isolateScope();

            //No query and no suggestions
            expect(directive.find('.search-form__autocomplete').length).toBe(0);

            //A query without suggestions
            scope.query = 'query without suggestions';
            scope.$apply();
            expect(directive.find('.search-form__autocomplete').length).toBe(0);

            //A query with suggestions
            scope.query = 'query with suggestions';
            scope.$apply();

            expect(directive.find('.search-form__autocomplete').length).toBe(1);
            expect(directive.find('.search-form__autocomplete div:nth-child(1) h4').text()).toBe('Category A');
            expect(directive.find('.search-form__autocomplete div:nth-child(1) li:nth-child(1)').text())
                .toBe('Suggestion A1 (extra information)');
            expect(directive.find('.search-form__autocomplete div:nth-child(1) li:nth-child(2)').text())
                .toBe('Suggestion A2 (more information)');

            expect(directive.find('.search-form__autocomplete div:nth-child(2) h4').text()).toBe('Category B');
            expect(directive.find('.search-form__autocomplete div:nth-child(2) li:nth-child(1)').text())
                .toBe('Suggestion B1');
        });

        it('won\'t try to fetch suggestions if there is no query', function () {
            var directive = getDirective(),
                scope = directive.isolateScope();

            spyOn(autocompleteData, 'search').and.callThrough();

            //With a query
            scope.query = 'query without suggestions';

            expect(autocompleteData.search).toHaveBeenCalledTimes(1);
            expect(autocompleteData.search).toHaveBeenCalledWith('query without suggestions');

            //Without a query;
            scope.query = '';

            expect(autocompleteData.search).toHaveBeenCalledTimes(1);
        });

        describe('with mouse support', function () {
            it('opens a detail page when clicking a suggestion', function () {
                var directive = getDirective();

                //Load suggestions
                directive[0].querySelector('.js-search-input').value = 'query with suggestions';
                directive[0].querySelector('.js-search-input').trigger('change');

                spyOn(store, 'dispatch');

                //First suggestion
                directive.find('.search-form__autocomplete button').eq(0).click();
                $timeout.flush();

                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.FETCH_DETAIL,
                    payload: 'blah-blah/1'
                });

                //Second suggestion
                directive.find('.search-form__autocomplete button').eq(1).click();
                $timeout.flush();

                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.FETCH_DETAIL,
                    payload: 'blah-blah/2'
                });

                //Third suggestion
                directive.find('.search-form__autocomplete button').eq(2).click();
                $timeout.flush();

                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.FETCH_DETAIL,
                    payload: 'something/789'
                });
            });

            it('set the suggested query in the searchbox when clicking a suggestion', function () {
                var directive = getDirective();

                //Load suggestions
                directive[0].querySelector('.js-search-input').value = 'query with suggestions';
                directive[0].querySelector('.js-search-input').trigger('change');

                //Click a suggestion
                directive.find('.search-form__autocomplete button').eq(0).click();
                expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion A1');
            });

            it('hides the suggestions when choosing a suggestion', function () {
                /**
                 * Clicking on a suggestion link triggers the blur event on the searchbox.
                 */
                var directive = getDirective();

                //Load suggestions
                directive[0].querySelector('.js-search-input').value = 'query with suggestions';
                directive[0].querySelector('.js-search-input').trigger('change');

                expect(directive.find('.search-form__autocomplete').length).toBe(1);

                //Click a suggestion
                directive.find('.search-form__autocomplete button').eq(0).click();
                directive[0].querySelector('.js-search-input').trigger('blur');
                $timeout.flush();

                expect(directive.find('.search-form__autocomplete').length).toBe(0);
            });
        });

        describe('with keyboard support', function () {
            function triggerKeyDownEvent (element, keyCode) {
                var event;

                event = angular.element.Event('keydown');
                event.keyCode = keyCode;

                element.trigger(event);
            }

            it('can select a query by navigating with the UP and DOWN arrows', function () {
                var directive = getDirective();

                //Load suggestions
                directive[0].querySelector('.js-search-input').value = 'query with suggestions';
                directive[0].querySelector('.js-search-input').trigger('change');

                //Make sure no suggestion is highlighted by default
                expect(directive.find('.search-form__autocomplete li').eq(0).find('button').hasClass('active'))
                    .toBe(false);
                expect(directive.find('.search-form__autocomplete li').eq(1).find('button').hasClass('active'))
                    .toBe(false);
                expect(directive.find('.search-form__autocomplete li').eq(2).find('button').hasClass('active'))
                    .toBe(false);


                /**
                 * Press the DOWN ARROW for the first time
                 */
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                $rootScope.$apply();

                //Highlight the active suggestion in the list with suggestions
                expect(directive.find('.search-form__autocomplete li').eq(0).find('button').hasClass('active'))
                    .toBe(true);
                expect(directive.find('.search-form__autocomplete li').eq(1).find('button').hasClass('active'))
                    .toBe(false);
                expect(directive.find('.search-form__autocomplete li').eq(2).find('button').hasClass('active'))
                    .toBe(false);

                //Show the highlighted suggestion in the searchbox
                expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion A1');


                /**
                 * Press the DOWN ARROW for the second time
                 */
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                $rootScope.$apply();

                expect(directive.find('.search-form__autocomplete li').eq(0).find('button').hasClass('active'))
                    .toBe(false);
                expect(directive.find('.search-form__autocomplete li').eq(1).find('button').hasClass('active'))
                    .toBe(true);
                expect(directive.find('.search-form__autocomplete li').eq(2).find('button').hasClass('active'))
                    .toBe(false);

                expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion A2');


                /**
                 * Press the DOWN ARROW again (making sure the 2nd category of suggestions is working as well)
                 */
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                $rootScope.$apply();

                expect(directive.find('.search-form__autocomplete li').eq(0).find('button').hasClass('active'))
                    .toBe(false);
                expect(directive.find('.search-form__autocomplete li').eq(1).find('button').hasClass('active'))
                    .toBe(false);
                expect(directive.find('.search-form__autocomplete li').eq(2).find('button').hasClass('active'))
                    .toBe(true);

                expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion B1');


                /**
                 * Press the UP arrow
                 */
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 38);
                $rootScope.$apply();

                expect(directive.find('.search-form__autocomplete li').eq(0).find('button').hasClass('active'))
                    .toBe(false);
                expect(directive.find('.search-form__autocomplete li').eq(1).find('button').hasClass('active'))
                    .toBe(true);
                expect(directive.find('.search-form__autocomplete li').eq(2).find('button').hasClass('active'))
                    .toBe(false);

                expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion A2');
            });

            it('restores the original query if the UP is used to remove focus from the suggestions', function () {
                var directive = getDirective();

                //Load suggestions
                directive[0].querySelector('.js-search-input').value = 'query with suggestions';
                directive[0].querySelector('.js-search-input').trigger('change');

                //Navigate to a suggestion
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                $rootScope.$apply();

                expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion A1');

                //Deselect all suggestion in the autocomplete, by navigating back with the UP ARROW
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 38);
                $rootScope.$apply();

                expect(directive[0].querySelector('.js-search-input').value).toBe('query with suggestions');
            });

            it('restores the original query and hides the suggestion when pressing ESCAPE', function () {
                var directive = getDirective();

                //Load suggestions
                directive[0].querySelector('.js-search-input').value = 'query with suggestions';
                directive[0].querySelector('.js-search-input').trigger('change');

                //Navigate to the third suggestion
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                $rootScope.$apply();

                expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion B1');
                expect(directive.find('.search-form__autocomplete').length).toBe(1);

                //Press ESCAPE
                triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 27);

                expect(directive[0].querySelector('.js-search-input').value).toBe('query with suggestions');
                expect(directive.find('.search-form__autocomplete').length).toBe(0);
            });

            describe('submitting the form (triggered by ENTER) with a highlighted suggestion', function () {
                var directive;

                beforeEach(function () {
                    spyOn(store, 'dispatch');

                    directive = getDirective();

                    //Load suggestions
                    directive[0].querySelector('.js-search-input').value = 'query with suggestions';
                    directive[0].querySelector('.js-search-input').trigger('change');

                    //Navigate to the second suggestion
                    triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                    triggerKeyDownEvent(directive[0].querySelector('.js-search-input'), 40);
                    $rootScope.$apply();

                    //Trigger the submit
                    directive.find('.search-form').trigger('submit');
                });

                it('opens the selected suggestion', function () {
                    expect(store.dispatch).toHaveBeenCalledWith({
                        type: ACTIONS.FETCH_DETAIL,
                        payload: 'blah-blah/2'
                    });
                });

                it('sets the active suggestion in the searchbox', function () {
                    expect(directive[0].querySelector('.js-search-input').value).toBe('Suggestion A2');
                });

                it('hides the suggestions when submitting the form', function () {
                    expect(directive.find('.search-form__autocomplete').length).toBe(0);
                });
            });
        });

        it('hides the suggestions when the searchbox loses focus', function () {
            var directive = getDirective();

            //Load suggestions
            directive[0].querySelector('.js-search-input').value = 'query with suggestions';
            directive[0].querySelector('.js-search-input').trigger('change');

            expect(directive.find('.search-form__autocomplete').length).toBe(1);

            //Lose focus
            directive[0].querySelector('.js-search-input').trigger('blur');
            $timeout.flush();

            expect(directive.find('.search-form__autocomplete').length).toBe(0);
        });
    });
});