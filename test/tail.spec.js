describe('tail', function () {
    var tail;
    beforeEach(function () {
        tail = H.tail;
    });

    it('should return empty string for string of length 0', function () {
        expect(tail('')).toEqual('');
    });

    it('should return empty array for array of length 0', function () {
        expect(tail([])).toEqual([]);
    });

    it('should return empty sets for strings and arrays of length 1', function () {
        expect(tail('f')).toEqual('');
        expect(tail([1])).toEqual([]);
    });

    it('should return all but last for string an array of length >1', function () {
        expect(tail('ivory')).toEqual('vory');
        expect(tail([1,2,3])).toEqual([2,3]);
    });
});
