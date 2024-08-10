const { add } = require("../src/string-calculator");

describe('String Calculator', () => {
    test('Check Empty String', () => {
        expect(add("")).toBe(0);
    })
});