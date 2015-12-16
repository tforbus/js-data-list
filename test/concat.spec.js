describe('concat', function () {
    var concat;

    beforeEach(function () {
        concat = H.concat;
    });

    it('should exist', function () {
        expect(concat).not.toBe(undefined);
    });

    it('should be curried', function () {
        var foocat = concat('foo');
        expect(foocat('bar')).toBe('foobar');
    });

    it('should concat two strings', function () {
        expect(concat('foo', 'bar')).toBe('foobar');
    });

    it('should concat two lists', function () {
        var xs = [1,2,3];
        var ys = [4,5];
        expect(concat(xs, ys).length).toBe(5);
    });
});
