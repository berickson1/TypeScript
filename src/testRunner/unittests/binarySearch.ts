namespace ts {
    describe("unittests:: binarySearch", () => {
        function assertBetween(actual: number, low: number, high: number) {
            assert.isTrue(actual >= low, `Value ${actual} is less than minimum of ${low}`);
            assert.isTrue(actual <= high, `Value ${actual} is greater than maximum of ${high}`);
        }

        it("Finds exact Index in unique array", () => {
            assert.equal(binarySearch([1, 2, 3, 4], 1, v => v, compareValues), 0);
            assert.equal(binarySearch([1], 1, v => v, compareValues), 0);
            assert.equal(binarySearch([0, 1, 2, 3, 4], 1, v => v, compareValues), 1);
            assert.equal(binarySearch([-8, -7, -5, -2, 1, 3, 5, 7, 9], 1, v => v, compareValues), 4);
            assert.equal(binarySearch([0, 1], 1, v => v, compareValues), 1);
        });

        it("Finds matching Index in non-unique array array", () => {
            // The behavior here is not well defnied. The definition of the function does not explicitly state that we will return the first or last index, only that we will return a singular index that matches
            assertBetween(binarySearch([1, 1, 2, 3, 4], 1, v => v, compareValues), 0, 1);
            assertBetween(binarySearch([1, 1, 1, 1, 1, 1], 1, v => v, compareValues), 0, 5);
            assertBetween(binarySearch([1, 1], 1, v => v, compareValues), 0, 1);
            assertBetween(binarySearch([0, 1, 1, 2, 3, 4], 1, v => v, compareValues), 1, 2);
            assertBetween(binarySearch([0, 1, 1, 1, 1], 1, v => v, compareValues), 1, 4);

            assertBetween(binarySearch([0, 0, 0, 1], 1, v => v, compareValues), 3, 3);
        });

        it("Return 2s compliement higher neighbor when not found", () => {
            assert.equal(binarySearch([1, 2, 3, 4], 1.5, v => v, compareValues), ~1);
            assert.equal(binarySearch([1, 1, 2, 3, 4], 1.5, v => v, compareValues), ~2);
            assert.equal(binarySearch([1, 1, 1, 1], 1.5, v => v, compareValues), ~4);
            assert.equal(binarySearch([1], 1.5, v => v, compareValues), ~1);

            assert.equal(binarySearch([0, 1, 2, 3, 4], -1, v => v, compareValues), ~0);
            assert.equal(binarySearch([0, 1, 1, 2, 3, 4], -1, v => v, compareValues), ~0);
            assert.equal(binarySearch([0, 1, 1, 1, 1], -1, v => v, compareValues), ~0);
            assert.equal(binarySearch([0, 1], -1, v => v, compareValues), ~0);

            assert.equal(binarySearch([0, 0, 0, 1], 2, v => v, compareValues), ~4);
        });
    });
}
