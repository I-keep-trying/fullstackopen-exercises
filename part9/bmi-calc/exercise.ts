interface CalcValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalc = (
  target: number,
  entries: number[]
): CalcValues => {
  const periodLength = entries.length;

  const trainingDays = entries.reduce((acc, next) => {
    if (next > 0) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const workingTotal = entries.reduce((acc, next) => {
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
  console.log('report results', report);
  return report;
};
