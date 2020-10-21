var parseInputArguments = function (args) {
    var arr = [];
    for (var i = 2; i < process.argv.length;) {
        if (!isNaN(Number(args[i]))) {
            arr[i - 2] = Number(args[i]);
            i++;
        }
        else {
            throw new Error('Provided values were not numbers!');
        }
    }
    return arr;
};
var runCalculation = function (entries) {
    var target = entries[0];
    var periodLength = entries.length - 1;
    var days = entries;
    days.splice(0, 1);
    var trainingDays = days.reduce(function (acc, next) {
        if (next > 0) {
            return acc + 1;
        }
        return acc;
    }, 0);
    var workingTotal = days.reduce(function (acc, next) {
        return acc + next;
    });
    var average = ((workingTotal / periodLength) * 100) / 100;
    var success = average >= target;
    var setRating = function () {
        if (average >= target) {
            return 3;
        }
        else if (average >= target * .75) {
            return 2;
        }
        else {
            return 1;
        }
    };
    var rating = setRating();
    var setRatingDescription = function () {
        if (rating === 3) {
            return 'GOOD JOB! ';
        }
        else if (rating === 2) {
            return 'Good enough, I guess';
        }
        else {
            return 'Try harder next week';
        }
    };
    var ratingDes = setRatingDescription();
    console.log("\n  periodLength: " + periodLength + ",\n  trainingDays: " + trainingDays + ",\n  success: " + success + ",\n  rating: " + rating + ",\n  ratingDescription: " + ratingDes + ",\n  target: " + target + ",\n  average: " + average + "\n  ");
    return;
};
try {
    var arr = parseInputArguments(process.argv);
    runCalculation(arr);
}
catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
