const filterNumbersAndDelimiters = (numbers) => {
  let delimiter = /[\n,]/; // Default delimiters: newline and comma
  let numberString = numbers;

  // Check if the input starts with a custom delimiter declaration
  const customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);
  if (customDelimiterMatch) {
    delimiter = new RegExp(`[${customDelimiterMatch[1]}]`); // Set custom delimiter
    numberString = numbers.slice(customDelimiterMatch[0].length); // Remove the delimiter declaration line
  }
  return { delimiter, numberString };
};

module.exports = { filterNumbersAndDelimiters };
