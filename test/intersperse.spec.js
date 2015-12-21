describe('intersperse', function () {
    var intersperse = H.intersperse;

    it('should return empty list if the list is empty', function () {
        expect(intersperse(1, [])).toEqual([]);
    });

    it('should return the list if the list was length 1', function () {
        expect(intersperse(1, [1])).toEqual([1]);
    });

    it('should intersperse the value between each element in the list', function () {
        expect(intersperse(0, [1,2,3])).toEqual([1, 0, 2, 0, 3]);
    });
});
