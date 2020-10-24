interface BmiValues {
  height: number;
  mass: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (input: BmiValues): string => {
  const bmi = input.mass / (input.height / 100) ** 2;
  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi >= 15 && bmi < 16) {
    return 'Severely underweight';
  } else if (bmi >= 16 && bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal - healthy weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30 && bmi < 35) {
    return 'Moderately obese';
  } else if (bmi >= 35 && bmi < 40) {
    return 'Severely obese';
  } else if (bmi >= 40) {
    return 'Very severely obese';
  } else {
    return 'Your mother';
  }
};

try {
  calculateBmi(parseArguments(process.argv));
} catch (e) {
  if (e instanceof Error) {
    if (process.argv.length <= 2) {
      console.log('waiting for args...');
    } else {
      console.log('Error, something bad happened, message: ', e.message);
    }
  }
}
