describe('The api factory', function () {
    var $httpBackend,
        api,
        mockedApiData;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                environment: {
                    API_ROOT: 'http://api.example.com/some-path/'
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

        $httpBackend.whenGET('http://api.example.com/some-path/bag/verblijfsobject/123').respond(mockedApiData);
    });

    it('uses API_ROOT from the environment factory', function () {
        var hasFetchedData = false;

        api.get('bag/verblijfsobject/123').then(function () {
            hasFetchedData = true;
        });

        $httpBackend.flush();

        expect(hasFetchedData).toBe(true);
    });

    it('returns the data as a promise', function () {
        var returnValue;

        api.get('bag/verblijfsobject/123').then(function (data) {
            returnValue = data;
        });

        $httpBackend.flush();

        //This checks that it doesn't return the $http response which contains meta information as well.
        expect(returnValue).toEqual(mockedApiData);
    });
});