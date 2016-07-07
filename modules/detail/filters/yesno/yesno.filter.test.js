(function () {
    'use strict';

    describe('The yesno filter', function() {
        var yesno;

        beforeEach(function () {
            angular.mock.module('atlasDetail');

            angular.mock.inject(function ($filter) {
                yesno = $filter('dpYesno');
            });
        });

        it('is defined', function() {
            expect(yesno).toBeDefined();
        });

        it('converts true values to ja', function() {
            expect(yesno(true)).toBe('Ja');
        });

        it('converts false values to nee', function() {
            expect(yesno(false)).toBe('Nee');
        });

        it('converts none boolean values to an empty string', function() {
            expect(yesno('0')).toBe('');
            expect(yesno(0)).toBe('');
            expect(yesno(1)).toBe('');
            expect(yesno(null)).toBe('');
            expect(yesno(undefined)).toBe('');
        });
    });
})();
