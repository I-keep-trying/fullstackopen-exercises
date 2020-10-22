interface CalcValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseInputArguments = (args: Array<string>): number[] => {
  let arr: number[] = [];

  for (let i = 2; i < process.argv.length; ) {
    if (!isNaN(Number(args[i]))) {
      arr[i - 2] = Number(args[i]);
      i++;
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return arr;
};

const runCalculation = (entries: number[]): CalcValues => {
  let target = entries[0];

  const periodLength = entries.length - 1;

  const days = entries;
  days.splice(0, 1);

  const trainingDays = days.reduce((acc, next) => {
    if (next > 0) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const workingTotal = days.reduce((acc, next) => {
    return acc + next;
  });
  const average = ((workingTotal / periodLength) * 100) / 100;
  const success = average >= target;
  const setRating = () => {
    if (average >= target) {
      return 3;
    } else if (average >= target * 0.75) {
      return 2;
    } else {
      return 1;
    }
  };
  const rating = setRating();

  const setRatingDescription = () => {
    if (rating === 3) {
      return 'GOOD JOB! ';
    } else if (rating === 2) {
      return 'Good enough, I guess';
    } else {
      return 'Try harder next week';
    }
  };
  const ratingDes = setRatingDescription();

  const report = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDes,
    target: target,
    average: average,
  };
  console.log(report);
  return report;
};

try {
  const arr: number[] = parseInputArguments(process.argv);
  runCalculation(arr);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
