describe('partition', function () {
    var partition = H.partition;
    var gt3 = function (x) { return x > 3; };

    it('should return two empty lists when xs is empty', function () {
        expect(partition(gt3, [])).toEqual([ [], [] ]);
    });

    it('should return all elements matching the predicate in the first sublist', function () {
        expect(partition(gt3, [1,2,3,4,5,6])[0]).toEqual([4,5,6]);
    });

    it('should return all elements not matching the predicate in the second sublist', function () {
        expect(partition(gt3, [1,2,3,4,5,6])[1]).toEqual([1,2,3]);
    });
});
