let iterationCounter: number = 0;
let carsCrashed:boolean = false;

enum Direction{
    NORTH="NORTH",EAST="EAST", SOUTH="SOUTH", WEST="WEST"
}

interface Point{
    x:number;
    y:number;
}

type Car = {
    ascii: string;
    position: Point;
    speed: number;
    direction: Direction;
}

const car1: Car = {
    ascii: "B",
    position: {x:3,y:2},
    speed: 0,
    direction: Direction.EAST
}

const car2: Car = {
    ascii: "R",
    position: {x:3,y:2},
    speed: 0,
    direction: Direction.WEST
}

type MapTile = {
    id: string;
    directions: Direction[];
}
// Hilfstabelle für alternative Richtungen bei Kurven
const directionPriority: Record<Direction, Direction[]> = {
    [Direction.NORTH]: [Direction.NORTH, Direction.EAST, Direction.WEST],
    [Direction.EAST]:  [Direction.EAST, Direction.SOUTH, Direction.NORTH],
    [Direction.SOUTH]: [Direction.SOUTH, Direction.WEST, Direction.EAST],
    [Direction.WEST]:  [Direction.WEST, Direction.NORTH, Direction.SOUTH],
};
// Map Blueprint
const map: MapTile[][] = [
    [{id: "\u2554", directions: [Direction.EAST, Direction.SOUTH],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2566", directions: [Direction.EAST, Direction.SOUTH, Direction.WEST],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2557", directions: [Direction.SOUTH, Direction.WEST],}],
    [{id: "\u2551", directions: [Direction.NORTH, Direction.SOUTH],}, {id: " ", directions: [],}, {id: " ", directions: [],}, {id: "\u255A", directions: [Direction.NORTH, Direction.EAST],}, {id: "\u2566", directions: [Direction.EAST, Direction.SOUTH, Direction.WEST],}, {id: "\u255D", directions: [Direction.NORTH, Direction.WEST],}],
    [{id: "\u255A", directions: [Direction.NORTH, Direction.EAST],}, {id: "\u2550", directions: [Direction.EAST, Direction.WEST],}, {id: "\u2550", directions: [Direction.EAST, Direction.WEST],}, {id: "\u256B", directions: [Direction.EAST, Direction.WEST],}, {id: "\u255D", directions: [Direction.NORTH, Direction.WEST],}, {id: " ", directions: [],}],]
function carMovement(cars:Car[]) {
    for (const car of cars) {
        car.speed += 0.2;
        // Maximalgeschwindigkeit korrigieren
        if (car.speed > 1) {
            car.speed = 1;
        }
        // Bewegung wenn schnell genug
        if (car.speed > 0.5) {
            moveCar(car);
        }
    }
}

//bestimmt in welche Richtung car geht
function moveCar(car: Car) {
    const currentTile = map[car.position.y][car.position.x];// MapTile, auf dem das Auto steht
    // Erste gültige Richtung anhand der Priorität suchen
    const nextDirection = directionPriority[car.direction]
        .find(dir => currentTile.directions.includes(dir));
    if (nextDirection) { // Falls eine gültige Richtung existiert
        if (nextDirection === Direction.NORTH) {// in Richtung bewegen
            car.position.y -= 1;
        } else if (nextDirection === Direction.SOUTH) {
            car.position.y += 1;
        } else if (nextDirection === Direction.EAST) {
            car.position.x += 1;
        } else if (nextDirection === Direction.WEST) {
            car.position.x -= 1;
        }
        // Falls abbiegen: Bremsen + Richtung ändern
        if (nextDirection !== car.direction) {
            car.speed /= 2;
            car.direction = nextDirection;
        }
    }
}

//Iterationen:
runCode();
console.log("    █████████████████████████████████");
console.log("    ████ B O O M ████████████████████");
console.log("    █████████████████████████████████")
iterationCounter++;
console.log("__________________________________________________________________________________________________Page " + iterationCounter)
function runCode() {
    while (!carsCrashed) {
        carMovement([car1, car2]);
        iterationCounter++;
        if (iterationCounter > 2) {
            if (car1.position.y === car2.position.y &&
                car1.position.x === car2.position.x) {
                carsCrashed = true;
                console.log("OH NO A CAR CRASH")
            }
        }
//Map generating
        for (let y = 0; y < map.length; y++) {
            let row = '';
            for (let x = 0; x < map[y].length; x++) {
                if (x === car1.position.x && y === car1.position.y) {
                    row += car1.ascii;
                } else if (x === car2.position.x && y === car2.position.y) {
                    row += car2.ascii;
                } else
                    row += map[y][x].id;
            }
            console.log(row.trim());
        }
        console.log("car1 (B) position: " + car1.position, "| car2 (R) position: " + car2.position);
        console.log("car1 (B)speed: " + car1.speed, "| car2 (R) speed: " + car2.speed);
        console.log("car1 (B)direction: " + car1.direction.toLowerCase(), "| car2 (R) direction: " + car2.direction.toLowerCase());
        console.log("__________________________________________________________________________________________________Page " + iterationCounter);
    }
}