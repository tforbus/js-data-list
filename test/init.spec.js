describe('init', function () {
    var init;
    beforeEach(function () {
        init = H.init;
    });

    it('should exist', function () {
        expect(init).not.toBe(undefined);
    });

    it('should throw an error for an empty list', function () {
        expect(function () {
            init([]);
        }).toThrow();
    });

    it('should return empty array for array of length 1', function () {
        expect(init([1]).length).toBe(0);
    });

    it('should return all but last in an array', function () {
        expect(init([2,1,3])).toEqual([2,1]);
    });
});
