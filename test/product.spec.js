describe('product', function () {
    var product = H.product;

    it('should return 1 for an empty list', function () {
        expect(product([])).toEqual(1);
    });

    it('should return the value for a list of length 1', function () {
        expect(product([-1])).toEqual(-1);
        expect(product([1])).toEqual(1);
    });

    it('should return the product for a list', function () {
        expect(product([1, 2, 3, 4])).toEqual(24);
    });
});
