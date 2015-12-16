describe('tail', function () {
    var tail;
    beforeEach(function () {
        tail = H.tail;
    });

    it('should throw an error for an empty list', function () {
        expect(function () {
            tail([]);
        }).toThrow();
    });

    it('should return an empty list for a list of length 1', function () {
        expect(tail([1])).toEqual([]);
    });

    it('should return all but last for string an array of length >1', function () {
        expect(tail([1,2,3])).toEqual([2,3]);
    });
});
