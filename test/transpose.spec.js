describe('transpose', function () {
    var transpose = H.transpose;

    it('should return [] for an empty list', function () {
        expect(transpose([[]])).toEqual([]);
    });

    it('should return [ [1] ] when transposing [ [1] ]', function () {
        expect(transpose([ [1] ])).toEqual([ [1] ]);
    });

    it('should transpose an list where all sublists are equal length', function () {
        expect(transpose([ [1,2], [3,4] ])).toEqual([ [1,3], [2,4] ]);
    });

    it('should transpose a list where all sublists are not equal length', function () {
        expect(transpose([ [1,2], [3] ])).toEqual([ [1,3], [2] ]);
    });
});
