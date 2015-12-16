describe('splitAt', function () {
    var splitAt;
    beforeEach(function () {
        splitAt = H.splitAt;
    });

    it('should split when n <= 0', function () {
        expect(splitAt(0, [1,2,3])).toEqual([ [], [1,2,3] ]);
        expect(splitAt(-1, [1,2,3])).toEqual([ [], [1,2,3] ]);
    });

    it('should split when n < length xs', function () {
        expect(splitAt(3, [1,2,3,4,5])).toEqual([ [1,2,3], [4,5] ]);
        expect(splitAt(1, [1,2,3])).toEqual([ [1], [2,3] ]);
    });

    it('should split when n == length xs', function () {
        expect(splitAt(3, [1,2,3])).toEqual([[1,2,3], []]);
    });

    it('should split when n > length xs', function () {
        expect(splitAt(4, [1,2,3])).toEqual([ [1,2,3], [] ]);
    });
});
