var parseArguments = function (args) {
    console.log('args', args);
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            mass: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
var calculateBmi = function (height2, mass2) {
    height2 = height2 / 100;
    var bmi = mass2 / Math.pow(height2, 2);
    console.log('bmi', bmi);
    if (bmi < 15) {
        console.log('Very severely underweight');
    }
    else if (bmi >= 15 && bmi < 16) {
        console.log('Severely underweight');
    }
    else if (bmi >= 16 && bmi < 18.5) {
        console.log('Underweight');
    }
    else if (bmi >= 18.5 && bmi < 25) {
        console.log('Normal - healthy weight');
    }
    else if (bmi >= 25 && bmi < 30) {
        console.log('Overweight');
    }
    else if (bmi >= 30 && bmi < 35) {
        console.log('Moderately obese');
    }
    else if (bmi >= 35 && bmi < 40) {
        console.log('Severely obese');
    }
    else if (bmi >= 40) {
        console.log('Very severely obese');
    }
    else {
        console.log('Your mother');
    }
};
try {
    var _a = parseArguments(process.argv), height = _a.height, mass = _a.mass;
    calculateBmi(height, mass);
}
catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
