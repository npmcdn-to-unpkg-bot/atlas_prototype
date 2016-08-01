describe('The api factory', function () {
    var $httpBackend,
        api,
        mockedApiData;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                environment: {
                    API_ROOT: 'http://www.i-am-the-api-root.com/path/'
                }
            }
        );

        angular.mock.inject(function (_$httpBackend_, _api_) {
            $httpBackend = _$httpBackend_;
            api = _api_;
        });

        mockedApiData = {
            id: 1,
            title: 'This is a fake title'
        };

        $httpBackend.whenGET('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/').respond(mockedApiData);
    });

    it('getByUrl returns the data as a promise', function () {
        var returnValue;

        api.getByUrl('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/').then(function (data) {
            returnValue = data;
        });

        $httpBackend.flush();

        expect(returnValue).toEqual(mockedApiData);
    });

    it('getByUri can be used when the environment.API_ROOT is unknown', function () {
        var returnValue;

        api.getByUri('bag/verblijfsobject/123/').then(function (data) {
            returnValue = data;
        });

        $httpBackend.flush();

        expect(returnValue).toEqual(mockedApiData);
    });
});