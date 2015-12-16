describe('isEmpty', function () {
    var isEmpty;
    beforeEach(function () {
        isEmpty = H.isEmpty;
    });

    it('should return true for empty list', function () {
        expect(isEmpty([])).toBe(true);
    });

    it('should return true for empty string', function () {
        expect(isEmpty('')).toBe(true);
    });

    it('should return false for non empty list', function () {
        expect(isEmpty([1])).toBe(false);
    });

    it('should return false for non empty string', function () {
        expect(isEmpty('foo')).toBe(false);
    });
});
