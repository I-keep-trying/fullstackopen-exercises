/* const targetValue = 2 //average daily target

const weeklyEntries = [1, 3, 5, 3, 0.5, 2, 1.5]


const trainingPeriod = 7 */
const runCalculation = (values) => {
    const workingTotal = entries.reduce((acc, next) => {
        return acc + next;
    });
    console.log('workingTotal', workingTotal);
};
console.log(runCalculation(2, [1, 2, 3], 7));
