describe('The atlas-search-results component', function () {
    var $compile,
        $rootScope,
        $q,
        mockedSearchResults = [
            {
                label_singular: 'Adres',
                label_plural: 'Adressen',
                slug: 'adres',
                count: 11,
                results: [
                    {
                        label: 'Weesperstraat 101',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000864309/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 102',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000918914/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 104',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000918974/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 105',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630023754253/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 105',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000864311/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 106',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000918975/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 111',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000864313/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 112',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000919001/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 115',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000864315/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 116',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000919584/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 117',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/03630000864316/',
                        subtype: 'verblijfsobject'
                    }
                ],
                next: 'https://api-acc.datapunt.amsterdam.nl/atlas/search/adres/?q=weesperstraat&page=2'
            },
            {
                label_singular: 'Kadastraal subject',
                label_plural: 'Kadastrale subjecten',
                slug: 'subject',
                count: 3,
                results: [
                    {
                        label: 'Vereniging Van Eigenaars Vorrmalig Gebouw Ceres Weesperstraat Te Amsterdam',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/brk/subject/NL.KAD.Persoon.172140310/',
                        subtype: 'kadastraal_subject'
                    },
                    {
                        label: 'Vereniging Van Eigenaars Weesperstraat 104/106',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/brk/subject/NL.KAD.Persoon.172182389/',
                        subtype: 'kadastraal_subject'
                    },
                    {
                        label: 'Vereniging van eigenaars gebouw Weesperstraat 100-102 te Diemen',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/brk/subject/NL.KAD.Persoon.470358381/',
                        subtype: 'kadastraal_subject'
                    }
                ],
                next: null
            },
            {
                label_singular: 'Openbare ruimte',
                label_plural: 'Openbare ruimtes',
                slug: 'openbareruimte',
                count: 1,
                results: [
                    {
                        label: 'Weesperstraat',
                        endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/openbareruimte/03630000004835/',
                        subtype: 'weg'
                    }
                ],
                next: null
            }
        ],
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


    beforeEach(function () {
        angular.mock.module(
            'atlasSearchResults',
            {
                search: function () {
                    var q = $q.defer();

                    q.resolve(mockedSearchResults);

                    return q.promise;
                },
                geosearch: function () {
                    var q = $q.defer();

                    q.resolve(mockedGeosearchResults);

                    return q.promise;
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _$q_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $q = _$q_;
        });
    });

    function getComponent (query, location, category) {
        var component,
            element,
            scope;

        element = document.createElement('atlas-search-results');
        element.setAttribute('query', query);
        element.setAttribute('location', 'location');
        element.setAttribute('category', category);

        scope = $rootScope.$new();
        scope.location = location;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('search by query', function () {
        it('puts search results from the search API on the scope', function () {
            //vm.searchResults
            //vm.numberOfSearchResult
        });

        it('uses a loading indicator', function () {
            //vm.isLoading
        });

        describe('has category support', function () {
            it('categories with more than 10 results show a link to the category', function () {

            });

            it('can show a single category', function () {

            });

            it('can have a show more link inside a category', function () {

            });
        });
    });

    describe('search by location', function () {
        it('shows search results from the geosearch API on the scope', function () {
            //vm.searchResults
            //vm.numberOfSearchResult
        });

        it('uses a loading indicator', function () {
            //vm.isLoading
        });
    });
});