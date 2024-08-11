const { add } = require("../string-calculator");
const { EMPTY_STRING, NEGATIVE_NOT_ALLOWED } = require("../utils/errorMessages");

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
        expect(add("1,2,\n")).toBe(EMPTY_STRING);
    });
    test('multiple delimiters', () => {
        expect(add("//;\n1;2")).toBe(3);
        expect(add("//;\n1;2;3;4;5;6")).toBe(21);
    });
    test('multiple delimiters', () => {
        expect(add("1,2,3,-4,5")).toBe(`${NEGATIVE_NOT_ALLOWED} -4`);
        expect(add("1,-2,-3,-4,5")).toBe(`${NEGATIVE_NOT_ALLOWED} -2, -3, -4`);
    });
});
