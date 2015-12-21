describe('subsequences', function () {
    var subsequences = H.subsequences;

    it('should return [] for []', function () {
        expect(subsequences([])).toEqual([[]]);
    });

    it('should return [ [], [1] ] for a list containing only 1', function () {
        expect(subsequences([1])).toEqual([ [], [1] ]);
    });

    it('should generate all subsequences', function () {
        expect(subsequences([1,2])).toEqual([ [], [1], [2], [2,1] ]);
        expect(subsequences([1,2,3]).length).toBe(8);
    });

});
