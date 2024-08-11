const { NEGATIVE_NOT_ALLOWED, EMPTY_STRING } = require("./utils/errorMessages");
const {
  filterNumbersAndDelimiters,
  checkNegativeNumbers,
} = require("./utils/helpers");

const add = (numbers) => {
  if (numbers === "") {
    return 0;
  }

  // Check for delimiters and separate numbers from string
  const { delimiter, numberString } = filterNumbersAndDelimiters(numbers);
  
  // Check for invalid sequences like ",\n" or ",," or "\n,"
  if (numberString.match(/,\n|\n,|,,|,\s*$/)) {
    return EMPTY_STRING;
  }

  const delimiters = numberString.split(delimiter);

  // Convert the split string elements to integers
  const numbersArray = delimiters
    .flatMap((num) => num.split("\\n"))
    .map((num) => parseInt(num, 10) || 0);

  const { isNegative, negativeNumbers } = checkNegativeNumbers(numbersArray);
  if (isNegative) {
    return `${NEGATIVE_NOT_ALLOWED} ${negativeNumbers.join(", ")}`;
  }

  const result = delimiters.reduce(
    (sum, num) => sum + (parseInt(num, 10) || 0),
    0
  );

  return result;
};

module.exports = { add };
