describe('init', function () {
    var init;
    beforeEach(function () {
        init = H.init;
    });

    it('should exist', function () {
        expect(init).not.toBe(undefined);
    });

    it('should return empty string for empty string', function () {
        expect(init('')).toBe('');
    });

    it('should return empty array for empty array', function () {
        expect(init([]).length).toBe(0);
    });

    it('should return empty string for string of length 1', function () {
        expect(init('x')).toBe('');
    });

    it('should return empty array for array of length 1', function () {
        expect(init([1]).length).toBe(0);
    });

    it('should return all but last in a string', function () {
        expect(init('ivory')).toBe('ivor');
    });

    it('should return all but last in an array', function () {
        var result = init([2,1,3]);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(1);
    });
});
