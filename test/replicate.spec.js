describe('replicate', function () {

    var replicate = H.replicate;

    it('should throw an error if n < 0', function () {
        expect(function () {
            replicate(-1, 1);
        }).toThrow();
    });

    it('should replicate a number n times', function () {
        expect(replicate(3, 1)).toEqual([1,1,1]);
    });

    it('should replicate an array n times', function () {
        expect(replicate(3, [1])).toEqual([[1],[1],[1]]);
    });

    it('should return a new object reference for each element', function () {
        var o = { foo: 'bar' };
        var result = replicate(2, o);

        expect(result[0]).toEqual(o);
        expect(result[1]).toEqual(o);

        expect(result[0]).not.toBe(o);
        expect(result[0]).not.toBe(result[1]);
    });

});
