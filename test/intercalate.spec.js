describe('intercalate', function () {
    var intercalate = H.intercalate;

    it('should return an empty list when xss is a list containing only an empty list', function () {
        expect(intercalate([1], [ [] ])).toEqual([]);
    });

    it('should return the list when xss contains only 1 list', function () {
        expect(intercalate([1], [ [2] ])).toEqual([2]);
    });

    it('should insert the list between each element of the lists', function () {
        expect(intercalate([0], [ [1,2,3], [4,5,6], [7] ])).toEqual([1,2,3,0,4,5,6,0,7]);
    });
});
