describe('drop', function () {
    var drop;
    beforeEach(function () {
        drop = H.drop;
    });

    it('should drop the first elements for a list where length list > n', function () {
        var list = [10, 20, 30, 40, 50, 60];
        var result = drop(3, list);

        expect(result).toEqual([40, 50, 60]);
    });

    it('should drop the entire list when n > length xs', function () {
        expect(drop(1, [])).toEqual([]);
        expect(drop(2, [1])).toEqual([]);
        expect(drop(3, [1,2])).toEqual([]);
    });

    it('should drop none when n is 0', function () {
        expect(drop(0, [])).toEqual([]);
        expect(drop(0, [1,2])).toEqual([1,2]);
    });
});
