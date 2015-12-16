describe('length', function () {
    var length;
    beforeEach(function () {
        length = H.length;
    });

    it('should return 0 for null', function () {
        expect(length(null)).toBe(0);
    });

    it('should return 0 for empty strings an arrays', function () {
        expect(length('')).toBe(0);
        expect(length([])).toBe(0);
    });

    it('should return the correct length', function () {
        expect(length('ivory')).toBe(5);
        expect(length([-1, -2, -3])).toBe(3);
    });
});
