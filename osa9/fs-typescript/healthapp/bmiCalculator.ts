import { isNumber } from './utils.ts';

export const calculateBmi = (height:number, weight:number):string => {

  if (!isNumber(height)||!isNumber(weight)) {
    throw new Error("malformatted parameters");
  };

  const result = weight / (height / 100) ** 2;

  const ranges = [
    {
      title: "Underweight",
      from: 0,
      to: 18.5
    },
    {
      title: "Normal range",
      from: 18.5,
      to: 24.9
    },
    {
      title: "Overweight",
      from: 24.9,
      to: 29.9
    },
    {
      title: "Obesity",
      from: 30,
      to: 100
    },
  ];

  for (const range of ranges ){
    if (result >= range.from && result <= range.to) {
      return range.title;
    }
  }

  return 'You see this if something went wrong';
};

if (process.argv[2]) { // npm run calculateBmi 180 80
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  console.log(calculateBmi(height, weight));
}



