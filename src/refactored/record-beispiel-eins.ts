const schluesselEins:string = "Eins";
const schluesselZwei:string = "Zwei";
const schluesselDrei:string = "Drei";

const englischeZahlen: Record<string, string> = {
    "Eins": "One",
    "Zwei": "Two",
    "Drei": "Three",
    "Vier": "Four",
};

const meinWertAusEnglischenZahlenEins: string = englischeZahlen[schluesselEins];
const meinWertAusEnglischenZahlenZwei: string = englischeZahlen[schluesselZwei];
const meinWertAusEnglischenZahlenDrei: string = englischeZahlen[schluesselDrei];

console.log("Ausgabe: " + meinWertAusEnglischenZahlenEins);
console.log("Ausgabe: " + meinWertAusEnglischenZahlenZwei);
console.log("Ausgabe: " + meinWertAusEnglischenZahlenDrei);
