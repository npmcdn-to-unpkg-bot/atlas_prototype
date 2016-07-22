xdescribe('The environment factory', function () {
    var $location,
        mockedHostname;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                $location: {
                    host: function () {
                        return mockedHostname;
                    }
                }
            },
            function ($provide) {
                $provide.constant('ENVIRONMENT_CONFIG', {
                    PRODUCTION: {
                        favorite_animal: 'dog',
                        number_of_hobbies: 3
                    },
                    DEVELOPMENT: {
                        favorite_animal: 'cat',
                        number_of_hobbies: 1
                    }
                });
            }
        );

        angular.mock.inject(function (_$location_) {
            $location = _$location_;
        });
    });

    describe('returns different configuration based on the hostname', function () {
        it('has support for PRODUCTION', function () {
            mockedHostname = 'atlas.amsterdam.nl';

            angular.mock.inject(function (environment) {
                expect(environment).toEqual({
                    NAME: 'PRODUCTION',
                    favorite_animal: 'dog',
                    number_of_hobbies: 3
                });
            });
        });

        it('and a fallback to development for the rest', function () {
            var hostnames = ['localhost', 'example.com', 'acc.atlas.amsterdam.nl'];

            hostnames.forEach(function (hostname) {
                mockedHostname = hostname;

                angular.mock.inject(function (environment) {
                    expect(environment).toEqual({
                        NAME: 'DEVELOPMENT',
                        favorite_animal: 'cat',
                        number_of_hobbies: 1
                    });
                });
            });
        });
    });
});