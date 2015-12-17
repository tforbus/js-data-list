describe('tails', function () {
    var tails = H.tails;

    it('should return an array with an empty array for xs=[]', function () {
        expect(tails([])).toEqual([[]]);
    });

    it('should return the tails, starting with []', function () {
        expect(tails([1,2,3])).toEqual([
            [1,2,3],
            [2,3],
            [3],
            []
        ]);
    });
});
