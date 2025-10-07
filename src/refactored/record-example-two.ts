enum TestDirection {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "Left",
    RIGHT = "RIGHT",
}

const translation: Record<TestDirection, string> = {
    [TestDirection.UP]: "Nach oben",
    [TestDirection.DOWN]: "Nach unten",
    [TestDirection.LEFT]: "Nach links",
    [TestDirection.RIGHT]: "Nach rechts",
};

const myValue: string = translation[TestDirection.UP];

console.log("Ausgabe myValue: " + myValue);
