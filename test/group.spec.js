describe('group', function () {
    var group = H.group;

    it('should return [] for an empty array', function () {
        expect(group([])).toEqual([]);
    });

    it('should group a nonempty array properly', function () {
        var arr = [1,1,1,2,2,3,2];
        var result = group(arr);

        expect(result).toEqual([
            [1, 1, 1],
            [2, 2],
            [3],
            [2]
        ]);
    });
});
