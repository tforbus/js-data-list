describe('inits', function () {
    var inits = H.inits;

    it('should return an array with an empty array for xs=[]', function () {
        expect(inits([])).toEqual([[]]);
    });

    it('should return the inits, starting with []', function () {
        expect(inits([1,2,3])).toEqual([
            [],
            [1],
            [1,2],
            [1,2,3]
        ]);
    });
});
