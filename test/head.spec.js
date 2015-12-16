describe('head', function () {
    var head;
    beforeEach(function () {
        head = H.head;
    });

    it('should exist', function () {
        expect(head).not.toBe(undefined);
    });

    it('should return empty string for empty string', function () {
        expect(head('')).toBe('');
    });

    it('should return empty array for empty array', function () {
        expect(head([]).length).toBe(0);
    });

    it('should return the first element in a string', function () {
        expect(head('ivory')).toBe('i');
    });

    it('should return the first element in an array', function () {
        expect(head([2,1,3])).toBe(2);
    });
});
