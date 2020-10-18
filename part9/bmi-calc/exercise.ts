/* const targetValue = 2 //average daily target

const weeklyEntries = [1, 3, 5, 3, 0.5, 2, 1.5]


const trainingPeriod = 7 */

/* const weeklyTotal = weeklyEntries.reduce((total, next) => {
  return total + next
}) */

//const averageValue = weeklyTotal / trainingPeriod
//const averageTrunc = Math.round(averageValue * 100) / 100
//console.log('averageTrunc', averageTrunc, 'typeof', typeof averageTrunc)
//const targetReached = averageValue >= targetValue
//console.log('target reached? ', targetReached)
/* 
const calculateExercise = (target, timePeriod, entries) => {
    console.log('args',target, timePeriod,typeof entries)
  const workingTotal = entries.reduce((acc, next) => {
    return acc + next
  })
console.log('workingTotal',workingTotal)
  const avg = Math.round((workingTotal / timePeriod) * 100) / 100
  console.log('avg', avg)

const success = avg >= target
console.log('success? ',success)
  if (success) {
    return 'Goal was reached this week'
  } else if (!success && avg >= (target * 0.5)) {
    return 'Good enough I guess'
  } else if (avg < (target * 0.5)) {
    return 'Try harder next week'
  } else {
    return 'You died...'
  }
}

console.log('output:  ', calculateExercise(2, 7, [1,  1, .5, 2, 1.5]))
 */

 interface ExerciseValues {
  targetValue: number,
  entries: number[],
  trainingPeriod:number,
 }

 const runCalculation = (values: ExerciseValues): {targetValue: number; entries: number[]; trainingPeriod:number } => {
  const workingTotal = entries.reduce((acc, next) => {
    return acc + next
  })
  console.log('workingTotal',workingTotal)
 }

 console.log(runCalculation(2,[1,2,3],7))