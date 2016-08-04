describe('The user factory', function () {
    var $http,
        $httpBackend,
        $httpParamSerializer,
        user,
        httpPostHeaders,
        httpPostLoginData,
        httpPostLogoutData;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                environment: {
                    OAUTH_ROOT: 'http://atlas.amsterdam.nl/auth/'
                }
            },
            function ($provide) {
                $provide.constant('CLIENT_ID', 'I_AM_THE_CLIENT_ID');
            }
        );

        angular.mock.inject(function (_$http_, _$httpBackend_, _$httpParamSerializer_, _user_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $httpParamSerializer = _$httpParamSerializer_;
            user = _user_;
        });

        httpPostHeaders = angular.merge(
            {},
            $http.defaults.headers.common,
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        );

        httpPostLoginData = $httpParamSerializer(
            {
                username: 'Erik',
                password: 'mysecretpwd',
                client_id: 'I_AM_THE_CLIENT_ID',
                grant_type: 'password'
            }
        );

        httpPostLogoutData = $httpParamSerializer(
            {
                token: 'ERIKS_ACCESS_TOKEN',
                client_id: 'I_AM_THE_CLIENT_ID'
            }
        );
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('by default you are not logged in', function () {
        expect(user.getStatus()).toEqual({
            username: null,
            accessToken: null,
            isLoggedIn: false
        });
    });

    describe('can attempt to login', function () {
        it('successfully', function () {
            $httpBackend
                .expectPOST('http://atlas.amsterdam.nl/auth/token/', httpPostLoginData, httpPostHeaders)
                .respond({
                    access_token: 'ERIKS_ACCESS_TOKEN'
                });

            user.login('Erik', 'mysecretpwd');
            $httpBackend.flush();

            expect(user.getStatus()).toEqual({
                username: 'Erik',
                accessToken: 'ERIKS_ACCESS_TOKEN',
                isLoggedIn: true
            });
        });

        describe('and fail by throwing an error with an error message', function () {
            it('401 - Unauthorized', function () {
                var errorMessage;

                $httpBackend
                    .expectPOST('http://atlas.amsterdam.nl/auth/token/', httpPostLoginData, httpPostHeaders)
                    .respond(401);

                user
                    .login('Erik', 'mysecretpwd')
                    .catch(function (_errorMessage_) {
                        errorMessage = _errorMessage_;
                    });

                $httpBackend.flush();
                expect(errorMessage).toBe('De combinatie gebruikersnaam en wachtwoord wordt niet herkend.');
            });

            it('404 - Not Found', function () {
                var errorMessage;

                $httpBackend
                    .expectPOST('http://atlas.amsterdam.nl/auth/token/', httpPostLoginData, httpPostHeaders)
                    .respond(404);

                user
                    .login('Erik', 'mysecretpwd')
                    .catch(function (_errorMessage_) {
                        errorMessage = _errorMessage_;
                    });

                $httpBackend.flush();
                expect(errorMessage).toBe('Er is iets mis met de inlog server, probeer het later nog eens.');
            });

            it('fallback error messagge', function () {
                var errorMessage;

                $httpBackend
                    .expectPOST('http://atlas.amsterdam.nl/auth/token/', httpPostLoginData, httpPostHeaders)
                    .respond(408, null, null, 'Duurt te lang, ga ik niet op wachten');

                user
                    .login('Erik', 'mysecretpwd')
                    .catch(function (_errorMessage_) {
                        errorMessage = _errorMessage_;
                    });

                $httpBackend.flush();

                expect(errorMessage).toBe('Er is een fout opgetreden. Neem contact op met de beheerder en vermeld cod' +
                    'e: 408 status: Duurt te lang, ga ik niet op wachten.');
            });
        });
    });

    it('can logout', function () {
        //Login first
        $httpBackend.expectPOST('http://atlas.amsterdam.nl/auth/token/', httpPostLoginData, httpPostHeaders).respond({
            access_token: 'ERIKS_ACCESS_TOKEN'
        });

        user.login('Erik', 'mysecretpwd');
        $httpBackend.flush();

        expect(user.getStatus()).toEqual({
            username: 'Erik',
            accessToken: 'ERIKS_ACCESS_TOKEN',
            isLoggedIn: true
        });

        //Now logout
        $httpBackend
            .expectPOST('http://atlas.amsterdam.nl/auth/revoke_token/', httpPostLogoutData, httpPostHeaders)
            .respond(200);

        user.logout();
        $httpBackend.flush();

        expect(user.getStatus()).toEqual({
            username: null,
            accessToken: null,
            isLoggedIn: false
        });
    });
});