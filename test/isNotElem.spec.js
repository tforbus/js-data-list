describe('isNotElem', function () {
    var isNotElem = H.isNotElem;

    it('should return true if element does not exist', function () {
        expect(isNotElem(1, [2, 2, 2])).toBe(true);
        expect(isNotElem(1, [])).toBe(true);
    });

    it('should return false if element does exist', function () {
        expect(isNotElem(1, [1, 2, 3])).toBe(false);
    });
});
