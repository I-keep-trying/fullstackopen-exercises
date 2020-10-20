
interface CalcValues {
  target:number, 
day1: number,
day2: number,
day3: number,
   day4: number,
   day5: number,
   day6: number,
  day7: number
} 

const parseInputArguments = (args: Array<string>):CalcValues => {
  
  if (!isNaN(Number(args[2]))
    && !isNaN(Number(args[3]))
    && !isNaN(Number(args[5]))
    && !isNaN(Number(args[6]))
    && !isNaN(Number(args[7]))
    && !isNaN(Number(args[8]))
    && !isNaN(Number(args[9]))
  )
  {
      return {
        target: Number(args[2]),
        day1: Number(args[3]),
        day2: Number(args[4]),
        day3: Number(args[5]),
   day4: Number(args[6]),
   day5: Number(args[7]),
   day6: Number(args[8]),
  day7: Number(args[9])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}
;

const runCalculation = (  
  target2:number, 
  day11:number,
  day22: number,
  day33: number,
  day44: number,
  day55: number,
  day66: number,
 day77: number,
  ///
  rating: number,
  entries: number[],
  ratingDescription: string
 ) => {
entries = [day11, day22,day33,day44,day55,day66,day77]
  const periodLength = entries.length
  
  const setEntries = entries.reduce((acc, next) => {
if (next > 0) {
 return acc + 1
}
 return acc
},0)

  const workingTotal = entries.reduce((acc, next) => {
    return acc + next
  },)
 const average = ((workingTotal / periodLength) * 100) / 100
  const success = average >= target2
  const applyRating = () => {
    if (average >= target2)
    {
      return rating = 3
    } else if (average >= target2 * .75) {
      return rating = 2
    } else {
     return rating = 1
    }
  }
rating = applyRating()

  const applyRatingDescription = () => {
    if (rating === 3) {
      return 'GOOD JOB! '
    } else if (rating === 2 ) {
      return 'Good enough, I guess'
     } else {
       return 'Try harder next week'
     }
  }
  ratingDescription = applyRatingDescription()

  console.log(`
{ periodLength: ${periodLength},
  trainingDays: ${setEntries},
  success: ${success},
  rating: ${rating},
  ratingDescription: ${ratingDescription},
  target: ${target2},
  average: ${average} }
  `)

  
   }
  
try {
 const {
  target, 
  day1,
   day2,
   day3,
   day4,
   day5,
   day6,
  day7

   } = parseInputArguments(process.argv);
  runCalculation(
    target, 
    day1,
    day2,
    day3,
   day4,
   day5,
   day6,
  day7,
    1,
    [],
    '');
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

