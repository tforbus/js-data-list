describe('span', function () {
    var span;
    beforeEach(function () {
        span = H.span;
    });

    it('should split the list into two', function () {
       expect(span(function (x) { return x < 3; }, [1,2,3,4,1,2,3,4])).toEqual([ [1,2], [3,4,1,2,3,4] ]);
    });

    it('should return a list containing two empty lists if the list is empty', function () {
        expect(span(function (x) { return x < 3; }, [])).toEqual([ [], [] ]);
    });

    it('should split into all and none', function () {
        expect(span(function (x) { return x < 9; }, [1,2,3])).toEqual([ [1,2,3], [] ]);
    });

    it('should split into none and all', function () {
        expect(span(function (x) { return x > 9; }, [1,2,3])).toEqual([ [], [1,2,3] ]);
    });
});
