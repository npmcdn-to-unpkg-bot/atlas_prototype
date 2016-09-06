describe('The dp-data-selection-download-button component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module(
            'dpDataSelection',
            function ($provide) {
                $provide.constant('DATA_SELECTION_CONFIG', {
                    dataset_a: {
                        ENDPOINT: 'http://www.example.com/datasets/a/',
                        FILTERS: [
                            {
                                slug: 'filter_a'
                            }, {
                                slug: 'filter_b'
                            }
                        ]
                    }
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (dataset, activeFilters) {
        var component,
            element,
            scope;

        element = document.createElement('dp-data-selection-download-button');
        element.setAttribute('dataset', dataset);
        element.setAttribute('active-filters', 'activeFilters');

        scope = $rootScope.$new();
        scope.activeFilters = activeFilters;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('will generate a download link for the current dataset', function () {
        var component = getComponent('dataset_a', {});

        expect(component.find('a').attr('href')).toBe('http://www.example.com/datasets/a/export/');
    });

    it('can will add filters as parameters to the download link', function () {
        var component;

        //With one active filter
        component = getComponent('dataset_a', {
            filter_b: 'eenofanderewaarde'
        });

        expect(component.find('a').attr('href'))
            .toBe('http://www.example.com/datasets/a/export/?filter_b=eenofanderewaarde');

        //With two active filters
        component = getComponent('dataset_a', {
            filter_a: 'ingeschakeld',
            filter_b: 'eenofanderewaarde'
        });

        expect(component.find('a').attr('href'))
            .toBe('http://www.example.com/datasets/a/export/?filter_a=ingeschakeld&filter_b=eenofanderewaarde');
    });

    it('uses URL encoding for the values of the active filters', function () {
        var component;

        //With one active filter
        component = getComponent('dataset_a', {
            filter_b: 'Waarde met spaties'
        });

        expect(component.find('a').attr('href'))
            .toBe('http://www.example.com/datasets/a/export/?filter_b=Waarde%20met%20spaties');
    });
});