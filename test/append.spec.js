describe('append', function () {
    var append;

    beforeEach(function () {
        append = H.append;
    });

    it('should exist', function () {
        expect(append).not.toBe(undefined);
    });

    it('should append two lists', function () {
        var xs = [1,2,3];
        var ys = [4,5];
        expect(append(xs, ys).length).toBe(5);
    });

    it('should append an empty list to a list', function () {
        var xs = [];
        var ys = [1,2,3];

        var xsys = append(xs, ys);
        var ysxs = append(ys, xs);

        expect(xsys).toEqual(ysxs);
        expect(xsys).toEqual([1,2,3]);
    });
});
