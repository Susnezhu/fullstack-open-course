export const isNumber = (argument: number|string|number[] ): boolean => {

  if (Array.isArray(argument)) {
    return argument.every(num => !isNaN(num));
  }

  return !isNaN(Number(argument));
};