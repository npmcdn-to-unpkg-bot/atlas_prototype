describe('The api factory', function () {
    var $http,
        $httpBackend,
        api,
        mockedApiData,
        isLoggedIn;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                user: {
                    getStatus: function () {
                        if (isLoggedIn) {
                            return {
                                accessToken: 'MY_FAKE_ACCESS_TOKEN',
                                isLoggedIn: true
                            };
                        } else {
                            return {
                                accessToken: null,
                                isLoggedIn: false
                            };
                        }
                    }
                }
            }
        );

        angular.mock.inject(function (_$http_, _$httpBackend_, _api_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            api = _api_;
        });

        mockedApiData = {
            id: 1,
            title: 'This is a fake title'
        };

        $httpBackend.whenGET('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/').respond(mockedApiData);

        isLoggedIn = false;
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
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

    it('adds an Authorization header if the user is logged in', function () {
        //Not logged in
        isLoggedIn = false;

        $httpBackend.expectGET(
            'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/',
            $http.defaults.headers.common
        );
        api.getByUrl('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/');
        $httpBackend.flush();

        //Logged in
        isLoggedIn = true;

        $httpBackend.expectGET(
            'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/',
            angular.merge({}, $http.defaults.headers.common, {Authorization: 'Bearer MY_FAKE_ACCESS_TOKEN'})
        );
        api.getByUrl('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/');
        $httpBackend.flush();
    });
});