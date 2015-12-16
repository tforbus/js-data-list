describe('head', function () {
    var head;
    beforeEach(function () {
        head = H.head;
    });

    it('should exist', function () {
        expect(head).not.toBe(undefined);
    });

    it('should throw an error for an empty list', function () {
        expect(function () {
            head([]);
        }).toThrow();
    });

    it('should return the only element for a list of length 1', function () {
        expect(head([1])).toBe(1);
    });

    it('should return the first element in a list of length >1', function () {
        expect(head([2,1,3])).toBe(2);
    });
});
