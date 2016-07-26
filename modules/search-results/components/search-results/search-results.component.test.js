fdescribe('The atlas-search-results component', function () {
    var $compile,
        $rootScope,
        $q,
        store,
        ACTIONS,
        mockedSearchResults,
        mockedGeosearchResults;
    
    beforeEach(function () {
        angular.mock.module(
            'atlasSearchResults',
            {
                search: {
                    search: function () {
                        var q = $q.defer();

                        q.resolve(mockedSearchResults);

                        return q.promise;
                    }
                },
                geosearch: {
                    search: function () {
                        var q = $q.defer();

                        q.resolve(mockedGeosearchResults);

                        return q.promise;

                    }
                },
                //Store is used in the non-mocked child directive dp-link
                store: {
                    dispatch: function () {}
                }
            },
            function ($provide) {
                $provide.constant('SEARCH_CONFIG', {
                    QUERY_ENDPOINTS: [
                        {
                            slug: 'openbare_ruimte',
                            label_singular: 'Openbare ruimte',
                            label_plural: 'Openbare ruimtes',
                            uri: 'path/to/openbare_ruimte/'
                        }, {
                            slug: 'adres',
                            label_singular: 'Adres',
                            label_plural: 'Adressen',
                            uri: 'path/to/adres/'
                        }
                    ]
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _$q_, _store_, _ACTIONS_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $q = _$q_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        mockedSearchResults = [
            {
                label_singular: 'Adres',
                label_plural: 'Adressen',
                slug: 'adres',
                count: 11,
                results: [
                    {
                        label: 'Weesperstraat 101',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864309/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 102',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000918914/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 104',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000918974/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 105',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630023754253/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 105',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864311/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 106',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000918975/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 111',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864313/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 112',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000919001/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 115',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864315/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 116',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000919584/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 117',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864316/',
                        subtype: 'verblijfsobject'
                    }
                ],
                next: 'https://some-domain/atlas/search/adres/?q=weesperstraat&page=2'
            },
            {
                label_singular: 'Openbare ruimte',
                label_plural: 'Openbare ruimtes',
                slug: 'openbare_ruimte',
                count: 1,
                results: [
                    {
                        label: 'Weesperstraat',
                        endpoint: 'https://some-domain/bag/openbareruimte/03630000004835/',
                        subtype: 'weg'
                    }
                ],
                next: null
            }
        ];
        mockedGeosearchResults = [
            {
                slug: 'pand',
                label_singular: 'Pand',
                label_plural: 'Panden',
                results: [
                    {
                        label: '03630013054429',
                        subtype: null,
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/pand/03630013054429/'
                    }
                ],
                count: 1
            },
            {
                label_singular: 'Adres',
                label_plural: 'Adressen',
                slug: 'adres',
                count: 11,
                results: [
                    {
                        label: 'Lumièrestraat 6',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023953/'
                    },
                    {
                        label: 'Lumièrestraat 8',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023954/'
                    },
                    {
                        label: 'Lumièrestraat 10',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023955/'
                    },
                    {
                        label: 'Lumièrestraat 12',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023956/'
                    },
                    {
                        label: 'Lumièrestraat 14',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023957/'
                    },
                    {
                        label: 'Lumièrestraat 16',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023958/'
                    },
                    {
                        label: 'Lumièrestraat 18',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023959/'
                    },
                    {
                        label: 'Lumièrestraat 20',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023960/'
                    },
                    {
                        label: 'Lumièrestraat 22',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023961/'
                    },
                    {
                        label: 'Lumièrestraat 24',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023962/'
                    },
                    {
                        label: 'Lumièrestraat 26',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023963/'
                    },
                    {
                        label: 'Lumièrestraat 28',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/03630001023964/'
                    }
                ],
                next: 'https://api.datapunt.amsterdam.nl/bag/verblijfsobject/?page=2&panden__id=03630013054429',
                more: {
                    label: 'Bekijk alle 11 adressen binnen dit pand',
                    endpoint: 'https://api.datapunt.amsterdam.nl/bag/pand/03630013054429/'
                }
            },
            {
                label_singular: 'Openbare ruimte',
                label_plural: 'Openbare ruimtes',
                results: [
                    {
                        label: 'Test OR',
                        subtype: 'landschappelijk gebied',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/openbareruimte/123/'
                    },
                    {
                        label: 'Test OR',
                        subtype: 'weg',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/openbareruimte/456/'
                    },
                    {
                        label: 'Test OR',
                        subtype: 'water',
                        endpoint: 'https://api.datapunt.amsterdam.nl/bag/openbareruimte/789/'
                    }
                ],
                count: 3
            },
            {
                label_singular: 'Kadastraal object',
                label_plural: 'Kadastrale objecten',
                results: [
                    {
                        label: 'ASD41AU00154G0000',
                        subtype: null,
                        endpoint: 'https://api.datapunt.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.11820015470000/'
                    }
                ],
                count: 1
            },
            {
                label_singular: 'Gebied',
                label_plural: 'Gebieden',
                results: [
                    {
                        label: 'Haveneiland Noordoost',
                        subtype: null,
                        endpoint: 'https://api.datapunt.amsterdam.nl/gebieden/buurt/03630023754004/'
                    },
                    {
                        label: 'IJburg West',
                        subtype: null,
                        endpoint: 'https://api.datapunt.amsterdam.nl/gebieden/buurtcombinatie/3630012052079/'
                    },
                    {
                        label: 'Ijburg / Eiland Zeeburg',
                        subtype: null,
                        endpoint: 'https://api.datapunt.amsterdam.nl/gebieden/gebiedsgerichtwerken/DX16/'
                    },
                    {
                        label: 'AW33',
                        subtype: null,
                        endpoint: 'https://api.datapunt.amsterdam.nl/gebieden/bouwblok/03630012096424/'
                    },
                    {
                        label: 'Oost',
                        subtype: null,
                        endpoint: 'https://api.datapunt.amsterdam.nl/gebieden/stadsdeel/03630011872039/'
                    }
                ],
                count: 5
            }
        ];

        spyOn(store, 'dispatch');
    });

    function getComponent (query, location, category) {
        var component,
            element,
            scope;

        element = document.createElement('atlas-search-results');
        scope = $rootScope.$new();

        if (angular.isString(query)) {
            element.setAttribute('query', query);
        }

        if (angular.isString(location)) {
            element.setAttribute('location', location);
        }

        if (angular.isString(category)) {
            element.setAttribute('category', 'category');
            scope.category = category;
        }

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('search by query', function () {
        it('shows search results', function () {
            var component = getComponent('Weesperstraat');

            //It shows 10 results from the first category and 1 results from the second category
            expect(component.find('ul dp-link').length).toBe(11);

            //The first result
            expect(component.find('ul dp-link').eq(0).text().trim()).toBe('Weesperstraat 101');
            component.find('ul dp-link').eq(0).find('button').click();
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.FETCH_DETAIL,
                payload: 'https://some-domain/bag/verblijfsobject/03630000864309/'
            });

            //The last results from the first category
            expect(component.find('ul dp-link').eq(9).text().trim()).toBe('Weesperstraat 116');
            component.find('ul dp-link').eq(9).find('button').click();
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.FETCH_DETAIL,
                payload: 'https://some-domain/bag/verblijfsobject/03630000919584/'
            });

            //The last (and only) result from the second category
            expect(component.find('ul dp-link').eq(10).text().trim()).toBe('Weesperstraat');
            component.find('ul dp-link').eq(10).find('button').click();
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.FETCH_DETAIL,
                payload: 'https://some-domain/bag/openbareruimte/03630000004835/'
            });
        });

        it('shows meta information above the search results', function () {
            var component;

            //When there are multiple search results it uses the plural form: resultaten
            component = getComponent('Weesperstraat');
            expect(removeWhitespace(component.find('p').text())).toBe('12 resultaten met "Weesperstraat"');

            //When there are over 1000 search results it uses a thousands separator
            mockedSearchResults[0].count = 1000;
            component = getComponent('Weesperstraat');
            expect(removeWhitespace(component.find('p').text())).toBe('1.001 resultaten met "Weesperstraat"');

            //When there is just 1 search result it uses the singular form: resultaat
            mockedSearchResults[0].count = 0;
            component = getComponent('Weesperstraat');
            expect(removeWhitespace(component.find('p').text())).toBe('1 resultaat met "Weesperstraat"');
        });

        describe('has category support', function () {
            it('has both singular and plural variations for the headings of categories', function () {
                var component;

                //A category with 11 search results uses the plural form and it shows the number of results in brackets
                component = getComponent('Weesperstraat');
                expect(component.find('h2').eq(0).text()).toBe('Adressen (11)');

                //A category with 1 search result uses the singular form and doesn't show the number or results
                mockedSearchResults[0].count = 1;
                mockedSearchResults[0].results.length = 1;
                component = getComponent('Weesperstraat');
                expect(component.find('h2').eq(0).text()).toBe('Adres');
            });

            it('categories with more than 10 results show a link to the category', function () {
                var component;

                //A category with 11 search results uses the plural form and it shows the number of results in brackets
                component = getComponent('Weesperstraat');
                expect(removeWhitespace(component.find('dp-link').eq(10).text())).toBe('Toon alle 11');
                component.find('dp-link button').click();
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.SHOW_SEARCH_RESULTS_CATEGORY,
                    payload: 'adres'
                });

                //This link shows numbers with a thousand separator
                mockedSearchResults[0].count = 1234;
                component = getComponent('Weesperstraat');
                expect(removeWhitespace(component.find('dp-link').eq(10).text())).toBe('Toon alle 1.234');
            });

            it('can show a single category', function () {
                var component = getComponent('Weesperstraat', null, 'adres');


            });

            it('can have a show more link inside a category', function () {
                //'Infinite scroll'
            });
        });
    });

    describe('search by location', function () {
        it('shows search results from the geosearch API on the scope', function () {
            //vm.searchResults
            //vm.numberOfSearchResult
        });

        it('shows meta information above the search results', function () {
            //formatted location + number of results thousands separator
        });

        it('has more link support', function () {
            //This is an exception made for verblijfsobjecten in the geosearch results
        });
    });

    it('shows a message when there are no search results', function () {
        //search

        //geosearch
    });

    function removeWhitespace (input) {
        return input
            .trim()
            //Remove new line characters
            .replace(/\n/g, '')
            //Replace 2 or more spaces with a single space
            .replace(/\s{2,}/g, ' ');
    }
});