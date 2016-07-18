describe('the atlas detail module', function() {
    var $compile,
        $rootScope,
        $scope,
        ACTIONS,
        api,
        endpointParser,
        location,
        mockedState,
        store,
        wgs84RdConverter;

    beforeEach(function() {
        angular.mock.module(
            'atlasDetail',
            {
                api: {
                    getByUrl: function() {}
                },
                location: {
                    getLocation: function() {}
                },
                endpointParser: {
                    parseEndpoint: function() {}
                },
                store: {
                    dispatch: function() {}
                },
                wgs84RdConverter: {
                    rdToWgs84: function() {}
                }
            }
        );

        angular.mock.inject(function(
            _$compile_, _$rootScope_, _$scope_, _ACTIONS_, _api_,
            _endpointParser_, _location_, _store_, _wgs84RdConverter_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $scope = _$scope_;
                ACTIONS = _ACTIONS_;
                api = _api_;
                endpointParser = _endpointParser_;
                location = _location_;
                store = _store_;
                wgs84RdConverter = _wgs84RdConverter_;
            }
        );

        mockedState = {

        };
    });

    // function getDirective (endpoint, isLoading) {
    //     var directive,
    //         element,
    //         scope;

    //     element = document.createElement('atlas-detail');
    //     element.setAttribute('endpoint', 'endpoint');
    //     element.setAttribute('isLoading', isLoading);

    //     scope = $rootScope.$new();
    //     scope.endpoint = endpoint;

    //     directive = $compile(element)(scope);
    //     scope.$apply();

    //     return directive;
    // }

    // it('watches for endpoint changes', function(){
    //     var directive,
    //         element;

    //     directive = getDirective();
    //     element = directive[0].querySelector();

    // });

});