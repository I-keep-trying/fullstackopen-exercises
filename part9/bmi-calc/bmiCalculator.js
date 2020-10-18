/* mass=180, height=74
BMI = (mass('k') / height('m')^2)
or
(mass('lb') / height('in')^2) * 703

    const result = (a / (b**2)) * 1000;
    console.log('result...',result);

Categories
Very severely underweight 0 - 15
Severely underweight 15 - 16
Underweight 16 - 18.5
Normal (healthy weight) 18.5 - 25
Overweight 25 - 30
Obese Class I (Moderately obese) 30 - 35
Obese Class II (Severely obese) 35 - 40
Obese Class III (Very severely obese) 40+
*/



const calculateBmi2 = (height, mass) => {
  height = height / 100
  const bmi = mass / height ** 2

  if (bmi < 15) {
    return 'Very severely underweight'
  } else if (bmi >= 15 && bmi < 16) {
    return 'Severely underweight'
  } else if (bmi >= 16 && bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal - healthy weight'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30 && bmi < 35) {
    return 'Moderately obese'
  } else if (bmi >= 35 && bmi < 40) {
    return 'Severely obese'
  } else if (bmi >= 40) {
    return 'Very severely obese'
  } else {
    return 'Your mother'
  }
}

try {
  console.log(calculateBmi2(180, 74))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
