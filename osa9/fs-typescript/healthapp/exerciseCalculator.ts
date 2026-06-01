import { isNumber } from './utils.ts';

type Result = {
  periodLength: number
  trainingDays: number
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

export const calculateExercises = (personData: number[], targetAmount: number): Result  => {
  if (!isNumber(personData)) {
    throw new Error("malformatted parameters");
  };

  if (!isNumber(targetAmount)) {
    throw new Error("malformatted parameters");
  }

  const results = { 
    periodLength: personData.length,
    trainingDays: personData.filter(item => item !== 0).length,
    success: true,
    rating: 0,
    ratingDescription: '',
    target: targetAmount,
    average: personData.reduce((total, num) => total + num, 0) / personData.length
  };

  results.success = results.average >= results.target;

  const successProsent = Math.round(results.average / results.target * 100);

  const ratingValues = [ // from 1 to 3
    {
      title: `Try next time a little harder. Success prosent: ${successProsent}%`,
      from: 0,
      to: 33.3333333333,
      rating: 1
    },
    {
      title: `Nice! But you can do better. Success prosent: ${successProsent}%`,
      from: 33.3333333333,
      to: 66.6666666666,
      rating: 2
    },
    {
      title: `Good job!. Almost there! Success prosent: ${successProsent}%`,
      from: 66.6666666666,
      to: 99.9,
      rating: 3
    },
    {
      title:`You did it! Success prosent: ${successProsent}%`,
      from: 100,
      to: 1000,
      rating: 3
    }
  ];

  ratingValues.forEach(rate => {
    if (successProsent >= rate.from && successProsent <= rate.to) {
      results.rating = rate.rating;
      results.ratingDescription = rate.title;
    }
  });

  return results;
};

if (process.argv[2] && process.argv[3]) { // npm run calculateExercises 2 3 0 2 4.5 0 3 1
  const workouts = process.argv.slice(3).map(Number);
  const target = Number(process.argv[2]); // first argument is target

  console.log(calculateExercises(workouts, target));
}



