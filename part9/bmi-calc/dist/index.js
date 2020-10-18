/* interface CalculateValues {
    mass: number;
    height: number;
  }

  const parseArguments = (args: Array<string>): CalculateValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        mass: Number(args[3]),
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }; */
const calculateBmi = (height, mass) => {
    height = height / 100;
    const bmi = mass / height ** 2;
    if (bmi < 15) {
        return 'Very severely underweight';
    }
    else if (bmi >= 15 && bmi < 16) {
        return 'Severely underweight';
    }
    else if (bmi >= 16 && bmi < 18.5) {
        return 'Underweight';
    }
    else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal - healthy weight';
    }
    else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    }
    else if (bmi >= 30 && bmi < 35) {
        return 'Moderately obese';
    }
    else if (bmi >= 35 && bmi < 40) {
        return 'Severely obese';
    }
    else if (bmi >= 40) {
        return 'Very severely obese';
    }
    else {
        return 'Your mother';
    }
};
try {
    //const { mass, height } = parseArguments(process.argv);
    console.log(calculateBmi(180, 74));
}
catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
