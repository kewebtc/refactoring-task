enum TestDirection {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "Left",
    RIGHT = "RIGHT",
}

const uebersetzung: Record<TestDirection, string> = {
    [TestDirection.UP]: "Nach oben",
    [TestDirection.DOWN]: "Nach unten",
    [TestDirection.LEFT]: "Nach links",
    [TestDirection.RIGHT]: "Nach rechts",
};

const meinWert: string = uebersetzung[TestDirection.UP];

console.log("Ausgabe: " + meinWert);
