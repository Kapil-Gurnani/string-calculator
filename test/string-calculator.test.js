const { add } = require("../src/string-calculator");

describe('String Calculator', () => {
    test('Check Empty String', () => {
        expect(add("")).toBe(0);
    });
    test('Check Sum of positive numbers', () => {
        expect(add("1,2,3")).toBe(6);
        expect(add("1,4,6,7,8,9,0,4,3,2")).toBe(44);
    });
    test(', and \n as delimiters', () => {
        expect(add("1\n2,3")).toBe(6);
        expect(add("1,2,\n")).toBe("Invalid input format");
    });
});