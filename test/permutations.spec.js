describe('permutations', function () {
    var permutations = H.permutations;

    it('should return a list of an empty list if passed an empty list', function () {
        expect(permutations([])).toEqual([[]]);
    });

    it('should return a list with only 1 list if passed a list of length 1', function () {
        expect(permutations([0])).toEqual([[0]]);
    });

    it('should return permutations of [1,2]', function () {
        expect(permutations([1,2])).toEqual([ [1,2], [2,1] ]);
    });

    it('should return all permutations', function () {
        expect(permutations([1,2,3]).length).toBe(6);
        expect(permutations([1,2,3,4]).length).toBe(24);
    });
});
