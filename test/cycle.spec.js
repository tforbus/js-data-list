describe('cycle', function () {
    var cycle = H.cycle;

    it('should throw an error for an empty list', function () {
        expect(function () {
            cycle([]);
        }).toThrow();
    });

    it('should repeat a list indefinitely', function () {
        var c = cycle([1,2,3]);
        expect(c.next().value).toEqual(1);
        expect(c.next().value).toEqual(2);
        expect(c.next().value).toEqual(3);
        expect(c.next().value).toEqual(1);
    });

    it('should not modify the object references', function () {
        var o1 = { foo: 'bar' };
        var o2 = { foo: 'baz' };
        var c = cycle([o1, o2]);

        expect(c.next().value).toEqual(o1);
        expect(c.next().value).toEqual(o2);
    });
});
