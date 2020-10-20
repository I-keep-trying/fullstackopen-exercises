var parseInputArguments = function (args) {
    if (!isNaN(Number(args[2]))
        && !isNaN(Number(args[3]))
        && !isNaN(Number(args[5]))
        && !isNaN(Number(args[6]))
        && !isNaN(Number(args[7]))
        && !isNaN(Number(args[8]))
        && !isNaN(Number(args[9]))) {
        return {
            target: Number(args[2]),
            day1: Number(args[3]),
            day2: Number(args[4]),
            day3: Number(args[5]),
            day4: Number(args[6]),
            day5: Number(args[7]),
            day6: Number(args[8]),
            day7: Number(args[9])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
var runCalculation = function (target2, day11, day22, day33, day44, day55, day66, day77, 
///
rating, entries, ratingDescription) {
    entries = [day11, day22, day33, day44, day55, day66, day77];
    var periodLength = entries.length;
    var setEntries = entries.reduce(function (acc, next) {
        if (next > 0) {
            return acc + 1;
        }
        return acc;
    }, 0);
    var workingTotal = entries.reduce(function (acc, next) {
        return acc + next;
    });
    var average = ((workingTotal / periodLength) * 100) / 100;
    var success = average >= target2;
    var applyRating = function () {
        if (average >= target2) {
            return rating = 3;
        }
        else if (average >= target2 * .75) {
            return rating = 2;
        }
        else {
            return rating = 1;
        }
    };
    rating = applyRating();
    var applyRatingDescription = function () {
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
    ratingDescription = applyRatingDescription();
    console.log("\n{ periodLength: " + periodLength + ",\n  trainingDays: " + setEntries + ",\n  success: " + success + ",\n  rating: " + rating + ",\n  ratingDescription: " + ratingDescription + ",\n  target: " + target2 + ",\n  average: " + average + " }\n  ");
};
try {
    var _a = parseInputArguments(process.argv), target = _a.target, day1 = _a.day1, day2 = _a.day2, day3 = _a.day3, day4 = _a.day4, day5 = _a.day5, day6 = _a.day6, day7 = _a.day7;
    runCalculation(target, day1, day2, day3, day4, day5, day6, day7, 1, [], '');
}
catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
