
 const calculateBMI = (height: number, weight: number) => {
    const bmi = weight/((height/100)**2);

    switch (true) {
        case (bmi < 16):
            return "Underweight (Severe thinness)";
        case (bmi < 17):
            return "Underweight (Moderate thinness)";
        case (bmi < 18.5):
            return "Underweight (Mild thinness)";
        case (bmi < 25):
            return "Normal (healthy weight)";
        case (bmi < 30):
            return "Overweight (Pre-obese)";
        case (bmi < 35):
            return "Obese (Class I)";
        case (bmi < 40):
            return "Obese (Class II)";
        case (bmi >= 40):
            return "Obese (Class III)";
            
    }
}


const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
console.log(calculateBMI(a, b))