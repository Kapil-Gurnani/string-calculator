const add = (numbers) => {
  if (numbers === "") {
    return 0;
  }

  const numsArr = numbers.split(',');
  const sum = numsArr.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0);
  return sum;
};

module.exports = { add };
