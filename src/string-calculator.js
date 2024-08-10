const add = (numbers) => {
  if (numbers === "") {
    return 0;
  }
  
  // Check for invalid sequences like ",\n" or ",," or "\n,"
  if (numbers.match(/,\n|\n,|,,|,\s*$/)) {
    return "Invalid input format";
  }

  const delimiters = numbers.split(/[\n,]/);

  const result = delimiters.reduce(
    (sum, num) => sum + (parseInt(num, 10) || 0),
    0
  );

  return result;
};

module.exports = { add };
