describe('concat', function () {
    it('should turn a list of lists into a single list', function () {
        expect(H.concat([ [1,2], [3,4], [5] ])).toEqual([1, 2, 3, 4, 5]);
    });
});
