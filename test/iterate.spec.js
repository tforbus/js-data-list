describe('iterate', function () {
    var iterate = H.iterate;

    it('should iterate by f of x', function () {
        var increment2 = iterate(function (x) { return x + 2; }, 0);

        expect(increment2.next().value).toBe(0);
        expect(increment2.next().value).toBe(2);
        expect(increment2.next().value).toBe(4);
    });
});
