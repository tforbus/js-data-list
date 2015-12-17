describe('isElem', function () {
    var isElem = H.isElem;

    it('should return false if element does not exist', function () {
        expect(isElem(1, [2, 2, 2])).toBe(false);
        expect(isElem(1, [])).toBe(false);
    });

    it('should return true if element does exist', function () {
        expect(isElem(1, [1, 2, 3])).toBe(true);
    });
});
