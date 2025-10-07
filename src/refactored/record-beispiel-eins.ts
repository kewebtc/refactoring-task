const keyOne:string = "Eins";
const keyTwo:string = "Zwei";
const keyThree:string = "Drei";

const englishNumbers: Record<string, string> = {
    "Eins": "One",
    "Zwei": "Two",
    "Drei": "Three",
    "Vier": "Four",
};

const valOneFromEnglishNumbers: string = englishNumbers[keyOne];
const valTwoFromEnglishNumbers: string = englishNumbers[keyTwo];
const valThreeFromEnglishNumbers: string = englishNumbers[keyThree];

console.log("Ausgabe valOneFromEnglishNumbers: " + valOneFromEnglishNumbers);
console.log("Ausgabe valTwoFromEnglishNumbers: " + valTwoFromEnglishNumbers);
console.log(" valThreeFromEnglishNumbers: " + valThreeFromEnglishNumbers);
