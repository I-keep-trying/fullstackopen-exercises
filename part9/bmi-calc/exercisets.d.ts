interface CalcValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
declare const parseInputArguments: (args: Array<string>) => number[];
declare const runCalculation: (entries: number[]) => CalcValues;
