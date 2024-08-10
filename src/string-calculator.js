const { filterNumbersAndDelimiters } = require("../utils/helpers");

const add = (numbers) => {
  if (numbers === "") {
    return 0;
  }

  // Check for delimiters and separate numbers from string
  const { delimiter, numberString } = filterNumbersAndDelimiters(numbers);

  // Check for invalid sequences like ",\n" or ",," or "\n,"
  if (numberString.match(/,\n|\n,|,,|,\s*$/)) {
    return "Invalid input format";
  }

  const delimiters = numberString.split(delimiter);

  const result = delimiters.reduce(
    (sum, num) => sum + (parseInt(num, 10) || 0),
    0
  );

  return result;
};

module.exports = { add };
