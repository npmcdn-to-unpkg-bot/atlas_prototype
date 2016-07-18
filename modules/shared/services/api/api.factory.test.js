describe('The api factory', function () {
    var $httpBackend,
        api,
        mockedApiData;

    beforeEach(function () {
        angular.mock.module(
            'dpShared'
        );

        angular.mock.inject(function (_$httpBackend_, _api_) {
            $httpBackend = _$httpBackend_;
            api = _api_;
        });

        mockedApiData = {
            id: 1,
            title: 'This is a fake title'
        };

        $httpBackend.whenGET('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/').respond(mockedApiData);
    });

    it('returns the data as a promise', function () {
        var returnValue;

        api.getByUrl('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/').then(function (data) {
            returnValue = data;
        });

        $httpBackend.flush();

        //This checks that it doesn't return the $http response which contains meta information as well.
        expect(returnValue).toEqual(mockedApiData);
    });
});