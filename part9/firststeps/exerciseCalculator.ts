import { question } from "readline-sync";

interface userValues {
    userTarget: string;
    userDailyHours: string[];
}
interface validatedValues {
    validTarget: number;
    validDailyHours: number[];
}

interface Result  { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}

const parseInput = (args: Array<string>): userValues => {
    let userTarget = '';
    let userDailyHours: string[] = [];
    if (args.length < 4) {
        userTarget = question("What is your target value? ");

        let dayNumber = 1;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const input = question(
            `How many hours did you exercise on day ${dayNumber}? (Press 'enter' to quit): `
            );

            if (input) {
            userDailyHours.push(input);
            dayNumber++;
            } else {
            break;
            }
        }
    }
    else{
        userTarget = args[2];
        userDailyHours = args.slice(3);
    }
    return { userTarget, userDailyHours };
}

const validateArguments = ( userTarget: string, userDailyHours: string[]): validatedValues => {
    if (Number(userTarget) <= 0){
        throw new Error("Target must be a positive value")
    }
    if (!Array.isArray(userDailyHours)) {
        throw new Error("Exercised days must be an array of values!");
    }
    if (
        !isNaN(Number(userTarget)) &&
        !userDailyHours.map((hour) => Number(hour)).some(isNaN)
    ) {
        return {
          validTarget: Number(userTarget),
          validDailyHours: userDailyHours.map((i) => Number(i)),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }

}



const exerciseCalculator = (target: number, dailyExericse: number[]) : Result =>{
    const periodLength = dailyExericse.length;
    const trainingDays = dailyExericse.filter( (i) => i > 0).length;
    const average = dailyExericse.reduce((a,b) => a + b,0)/periodLength;
    const success = average >= target;

    const getRating = (average: number, target: number): number => {
        if (average < target * 0.8) return 1;
        if (average < target) return 2;
        return 3;
    };

    const getRatingDescription = (rating: number): string => {
        if (rating === 1) {
          return "Don't give up! You can do better next week!";
        }
        if (rating === 2) {
          return "not too bad but could be better";
        }
        return "Nice work! Keep it up!";
    };

    const rating = getRating(average, target);
    const ratingDescription = getRatingDescription(rating);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
      };

}

//console.log(exerciseCalculator(2, [3, 0, 2, 4.5, 0, 3, 1]))

try {
    const { userTarget, userDailyHours } = (parseInput(process.argv));
    const { validTarget, validDailyHours } = validateArguments( userTarget, userDailyHours )
    console.log(exerciseCalculator(validTarget, validDailyHours))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }