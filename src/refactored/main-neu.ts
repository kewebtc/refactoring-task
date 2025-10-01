let iterationCounter: number = 0;
let carsCrashed:boolean = false;
let speedCorrection: number = 0;

enum Direction{
    NORTH="NORTH",EAST="EAST", SOUTH="SOUTH", WEST="WEST"
}

type Car = {
    ascii: string;
    position: number[];
    speed: number;
    tilesMoved: number;
    direction: Direction;
}
let car1: Car = {
    ascii: "B",
    position: [3, 2],
    speed: 0,
    tilesMoved: 0,
    direction: Direction.EAST,
}
let car2: Car = {
    ascii: "R",
    position: [3, 2],
    speed: 0,
    tilesMoved: 0,
    direction: Direction.WEST,
}

type MapTile = {
    id: string;
    directions: Direction[];
}

// Map Blueprint
const map: MapTile[][] = [
    [{id: "\u2554", directions: [Direction.EAST, Direction.SOUTH],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2566", directions: [Direction.EAST, Direction.SOUTH, Direction.WEST],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2557", directions: [Direction.SOUTH, Direction.WEST],}],
    [{id: "\u2551", directions: [Direction.NORTH, Direction.SOUTH],}, {id: " ", directions: [],}, {id: " ", directions: [],}, {id: "\u255A", directions: [Direction.NORTH, Direction.EAST],}, {id: "\u2566", directions: [Direction.EAST, Direction.SOUTH, Direction.WEST],}, {id: "\u255D", directions: [Direction.NORTH, Direction.WEST],}],
    [{id: "\u255A", directions: [Direction.NORTH, Direction.EAST],}, {id: "\u2550", directions: [Direction.EAST, Direction.WEST],}, {id: "\u2550", directions: [Direction.EAST, Direction.WEST],}, {id: "\u256B", directions: [Direction.EAST, Direction.WEST],}, {id: "\u255D", directions: [Direction.NORTH, Direction.WEST],}, {id: " ", directions: [],}],]
//functions
function directionCompass(direction:Direction):string{
    switch(direction){
        case Direction.NORTH:
            return "north"
        case Direction.EAST:
            return "east"
        case Direction.SOUTH:
            return "south"
        case Direction.WEST:
            return "west"
        default: return "error"
    }
}
function carMovement() {
    if (car1.speed < 0.9){
        car1.speed = car1.speed + 0.2;
    }
    if (car1.speed < 0.10 && car1.speed > 0.8 ){
        car1.speed = car1.speed + 0.1;
    }
    if (car2.speed < 0.9){
        car2.speed = car2.speed + 0.2;
    }
    if (car2.speed < 0.10 && car2.speed > 0.8 ){
        car2.speed = car2.speed + 0.1;
    }
    if (car1.speed > 1){
        speedCorrection = car1.speed - 1;
        car1.speed = car1.speed - speedCorrection;
    }
    if (car2.speed > 1){
        speedCorrection = car2.speed - 1;
        car2.speed = car2.speed - speedCorrection;
    }
    if (car1.speed > 0.5) {
        switch (car1.direction) {
            case Direction.NORTH:
                northCar1();
                break;
            case Direction.EAST:
                eastCar1();
                break;
            case Direction.SOUTH:
                southCar1();
                break;
            case Direction.WEST:
                westCar1();
                break;
        }
    }
    if (car2.speed > 0.5){
        switch(car2.direction){
            case Direction.NORTH:
                northCar2();
                break;
            case Direction.EAST:
                eastCar2();
                break;
            case Direction.SOUTH:
                southCar2();
                break;
            case Direction.WEST:
                westCar2();
                break;
        }
    }
}
//bestimmt in welche Richtung car geht
function northCar1(){
    let x = car1.position[0];
    let y = car1.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir      => dir === Direction.NORTH) !== undefined) {
        car1.position[1] -= 1;
    }
    else if (tile.directions.find(dir => dir ===Direction.EAST) !== undefined) {
        car1.position[0] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.EAST;
    }
    else if (tile.directions.find(dir => dir ===Direction.WEST) !== undefined) {
        car1.position[0] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.WEST;
    }
}
function eastCar1(){
    let x = car1.position[0];
    let y = car1.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir      => dir === Direction.EAST) !== undefined) {
        car1.position[0] += 1;
    }
    else if (tile.directions.find(dir => dir ===Direction.SOUTH) !== undefined) {
        car1.position[1] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.SOUTH;
    }
    else if (tile.directions.find(dir => dir === Direction.NORTH) !== undefined)
    {
        car1.position[1] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.NORTH;
    }
}
function southCar1(){

    let x = car1.position[0];
    let y = car1.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir === Direction.SOUTH) !== undefined)
    {
        car1.position[1] += 1;
    }
    else if (tile.directions.find(dir => dir === Direction.WEST) !== undefined)
    {
        car1.position[0] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.WEST;
    }
    else if (tile.directions.find(dir => dir === Direction.EAST) !== undefined)
    {
        car1.position[0] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.EAST;
    }
}
function westCar1(){

    let x = car1.position[0];
    let y = car1.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir === Direction.WEST) !== undefined)
    {
        car1.position[0] -= 1;
    }
    else if (tile.directions.find(dir => dir === Direction.NORTH) !== undefined)
    {
        car1.position[1] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.NORTH;
    }
    else if (tile.directions.find(dir => dir === Direction.SOUTH) !== undefined)
    {
        car1.position[1] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = Direction.SOUTH;
    }
}
function northCar2(){
    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir === Direction.NORTH) !== undefined)
    {
        car2.position[1] -= 1;
    }
    else if (tile.directions.find(dir => dir === Direction.EAST) !== undefined)
    {
        car2.position[0] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.EAST;
    }
    else if (tile.directions.find(dir => dir === Direction.WEST) !== undefined)
    {
        car2.position[0] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.WEST;
    }
}

function eastCar2(){
    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir === Direction.EAST) !== undefined) {
        car2.position[0] += 1;
    }
    else if (tile.directions.find(dir => dir === Direction.SOUTH) !== undefined) {
        car2.position[1] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.SOUTH;
    }
    else if (tile.directions.find(dir => dir === Direction.NORTH) !== undefined) {
        car2.position[1] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.NORTH;
    }
}

function southCar2(){
    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir === Direction.SOUTH) !== undefined)
    {
        car2.position[1] += 1;
    }
    else if (tile.directions.find(dir => dir === Direction.WEST) !== undefined)
    {
        car2.position[0] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.WEST;
    }
    else if (tile.directions.find(dir => dir === Direction.EAST) !== undefined)
    {
        car2.position[0] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.EAST;
    }
}
function westCar2() {

    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir === Direction.WEST) !== undefined) {
        car2.position[0] -= 1;
    } else if (tile.directions.find(dir => dir === Direction.NORTH) !== undefined) {
        car2.position[1] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.NORTH;
    } else if (tile.directions.find(dir => dir === Direction.SOUTH) !== undefined) {
        car2.position[1] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = Direction.SOUTH;
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
        carMovement();
        iterationCounter++;
        if (iterationCounter > 2) {
            let car1Y = car1.position[0];
            let car1Z = car1.position[1];
            let car2Y = car2.position[0];
            let car2Z = car2.position[1];
            if (car1Y === car2Y && car1Z === car2Z) {
                carsCrashed = true;
                console.log("OH NO A CAR CRASH")
            }
        }
//Map generating
        for (let y = 0; y < map.length; y++) {
            let row = '';
            for (let x = 0; x < map[y].length; x++) {
                if (x === car1.position[0] && y === car1.position[1]) {
                    row += car1.ascii;
                } else if (x === car2.position[0] && y === car2.position[1]) {
                    row += car2.ascii;
                } else
                    row += map[y][x].id;
            }
            console.log(row.trim());
        }
        console.log("car1 (B) position: " + car1.position, "| car2 (R) position: " + car2.position);
        console.log("car1 (B)speed: " + car1.speed, "| car2 (R) speed: " + car2.speed);
        console.log("car1 (B)direction: " + directionCompass(car1.direction), "| car2 (R) direction: " + directionCompass(car2.direction));
        console.log("__________________________________________________________________________________________________Page " + iterationCounter);
    }
}