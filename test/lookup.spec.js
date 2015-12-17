describe('lookup', function () {
    var lookup = H.lookup;

    it('should return undefined if there are no keys', function () {
        expect(lookup('foo', {})).toBe(undefined);
    });

    it('should return undefined if the key does not exist', function () {
        expect(lookup('foo', { bar: 1, baz: 2 })).toBe(undefined);
    });

    it('should return the key value if it does exist', function () {
        expect(lookup('foo', { bar: 1, baz: 3, foo: 3})).toBe(3);
    });
});
