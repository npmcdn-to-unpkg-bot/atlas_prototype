describe('The atlas-api-call component', function () {
    var $compile,
        $rootScope,
        $q,
        api;

    beforeEach(function () {
        angular.mock.module(
            'atlasDetail',
            {
                api: {
                    getByUrl: function (endpoint) {
                        var q = $q.defer(),
                            mockedResponse;

                        if (endpoint === 'http://www.some-domain.com/without-pagination/123/') {
                            mockedResponse = {
                                count: 99,
                                results: ['ITEM_1', 'ITEM_2', 'ITEM_99'],
                                _links: {
                                    next: null
                                }
                            };
                        } else {
                            mockedResponse = {
                                count: 99,
                                results: ['ITEM_1', 'ITEM_2', 'ITEM_99'],
                                _links: {
                                    next: {
                                        href: 'http://www.some-domain.com/with-pagination/456/?page=2'
                                    }
                                }
                            };
                        }

                        q.resolve(mockedResponse);

                        return q.promise;
                    }
                }
            },
            function ($provide) {
                $provide.factory('atlasPartialSelectDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _$q_, _api_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $q = _$q_;
            api = _api_;
        });

        spyOn(api, 'getByUrl').and.callThrough();
    });

    function getComponent (endpoint, partial, useBrkObjectExpanded) {
        var component,
            element,
            scope;

        element = document.createElement('atlas-api-call');
        element.setAttribute('endpoint', endpoint);
        element.setAttribute('partial', partial);
        element.setAttribute('use-brk-object-expanded', 'useBrkObjectExpanded');

        scope = $rootScope.$new();
        scope.useBrkObjectExpanded = useBrkObjectExpanded;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('does nothing if there is no endpoint', function () {
        var component = getComponent('', 'some-partial', false);

        expect(api.getByUrl).not.toHaveBeenCalled();
        expect(component.find('atlas-partial-select').length).toBe(0);
    });

    it('retrieves data from the api factory and restructures it for atlas-partial-select', function () {
        var component,
            scope;

        component = getComponent('http://www.some-domain.com/without-pagination/123/', 'some-partial', false);
        scope = component.isolateScope();

        expect(component.find('atlas-partial-select').length).toBe(1);
        expect(component.find('atlas-partial-select').attr('api-data')).toBe('vm.apiData');
        expect(scope.vm.apiData).toEqual({
            count: 99,
            results: ['ITEM_1', 'ITEM_2', 'ITEM_99']
        });
    });

    it('optionally sets next variable on the scope', function () {
        var component,
            scope;

        component = getComponent('http://www.some-domain.com/with-pagination/123/', 'some-partial', false);
        scope = component.isolateScope();

        expect(scope.vm.apiData).toEqual(jasmine.objectContaining({
            next: 'http://www.some-domain.com/with-pagination/456/?page=2'
        }));
    });

    it('communicates the partial variabe to atlas-partial-select', function () {
        var component;

        component = getComponent('http://www.some-domain.com/without-pagination/123/', 'some-partial', false);

        expect(component.find('atlas-partial-select').length).toBe(1);
        expect(component.find('atlas-partial-select').attr('partial')).toBe('some-partial');
    });

    it('overrides the brk/object endpoint based on the useBrkObjectExpanded variable', function () {
        //It does nothing when the endpoint doesn't match brk/object
        getComponent('http://www.some-domain.com/something/123/', 'some-partial', true);
        expect(api.getByUrl).toHaveBeenCalledWith('http://www.some-domain.com/something/123/');

        //It does nothing when the variable is set to false
        getComponent('http://www.some-domain.com/brk/object/123/', 'some-partial', false);
        expect(api.getByUrl).toHaveBeenCalledWith('http://www.some-domain.com/brk/object/123/');

        //It replaced the endpoint for brk-object when it is set to true
        getComponent('http://www.some-domain.com/brk/object/123/', 'some-partial', true);
        expect(api.getByUrl).toHaveBeenCalledWith('http://www.some-domain.com/brk/object-expand/123/');
    });
});