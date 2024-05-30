// check values are numbers and greater than 0

export const isValid = (
  heightNum: number,
  depthNum: number,
  lengthNum: number,
) => {
  if (isNaN(heightNum) || isNaN(depthNum) || isNaN(lengthNum)) {
    return false;
  }
  if (heightNum > 0 && depthNum > 0 && lengthNum > 0) {
    return true;
  }
  return false;
};
