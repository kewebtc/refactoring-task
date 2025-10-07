let iterationCounter: number = 0;
let carsCrashed:boolean = false;
let speedCorrection: number = 0;
type Car = {
    ascii: string;
    position: number[];
    speed: number;
    tilesMoved: number;
    direction: number[];
}
let car1: Car = {
    ascii: "B",
    position: [3, 2],
    speed: 0,
    tilesMoved: 0,
    direction: [2],
}
let car2: Car = {
    ascii: "R",
    position: [3, 2],
    speed: 0,
    tilesMoved: 0,
    direction: [4],
}
type MapTile = {
    id: string;
    directions: number[];
}
// Map Blueprint
const map: MapTile[][] = [[{id: "\u2554", directions: [2, 3],},{id: "\u2550", directions: [2, 4],},{id: "\u2550", directions: [2, 4],},{id: "\u2566", directions: [2, 3, 4],},{id: "\u2550", directions: [2, 4],},{id: "\u2557", directions: [3, 4],}],
                          [{id: "\u2551", directions: [1, 3],}, {id: " ", directions: [],}, {id: " ", directions: [],}, {id: "\u255A", directions: [1, 2],}, {id: "\u2566", directions: [2, 3, 4],}, {id: "\u255D", directions: [1, 4],}],
                          [{id: "\u255A", directions: [1, 2],}, {id: "\u2550", directions: [2, 4],}, {id: "\u2550", directions: [2, 4],}, {id: "\u256B", directions: [2, 4],}, {id: "\u255D", directions: [1, 4],}, {id: " ", directions: [],}],]
//functions
function directionCompass(direction:number[]):string{
    switch(direction[0]){
        case 1:
            return "north"
        case 2:
            return "east"
        case 3:
            return "south"
        case 4:
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
        switch (car1.direction[0]) {
            case 1:
                northCar1();
                break;
            case 2:
                eastCar1();
                break;
            case 3:
                southCar1();
                break;
            case 4:
                westCar1();
                break;
        }
    }
    if (car2.speed > 0.5){
        switch(car2.direction[0]){
            case 1:
                northCar2();
                break;
            case 2:
                eastCar2();
                break;
            case 3:
                southCar2();
                break;
            case 4:
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
    if (tile.directions.find(dir => dir ===1) !== undefined)
    {
        car1.position[1] -= 1;
    }
    else if (tile.directions.find(dir => dir ===2) !== undefined)
    {
        car1.position[0] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = [2];
    }
    else if (tile.directions.find(dir => dir ===4) !== undefined)
    {
        car1.position[0] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = [4];
    }
}
function eastCar1(){

    let x = car1.position[0];
    let y = car1.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir ===2) !== undefined)
    {
        car1.position[0] += 1;
    }
    else if (tile.directions.find(dir => dir ===3) !== undefined)
    {
        car1.position[1] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = [3];
    }
    else if (tile.directions.find(dir => dir ===1) !== undefined)
    {
        car1.position[1] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = [1];
    }
}
function southCar1(){

    let x = car1.position[0];
    let y = car1.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir ===3) !== undefined)
    {
        car1.position[1] += 1;
    }
    else if (tile.directions.find(dir => dir ===4) !== undefined)
    {
        car1.position[0] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = [4];
    }
    else if (tile.directions.find(dir => dir ===2) !== undefined)
    {
        car1.position[0] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = [2];
    }
}
function westCar1(){

    let x = car1.position[0];
    let y = car1.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir ===4) !== undefined)
    {
        car1.position[0] -= 1;
    }
    else if (tile.directions.find(dir => dir ===1) !== undefined)
    {
        car1.position[1] -= 1;
        car1.speed = car1.speed / 2;
        car1.direction = [1];
    }
    else if (tile.directions.find(dir => dir ===3) !== undefined)
    {
        car1.position[1] += 1;
        car1.speed = car1.speed / 2;
        car1.direction = [3];
    }
}
function northCar2(){

    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir ===1) !== undefined)
    {
        car2.position[1] -= 1;
    }
    else if (tile.directions.find(dir => dir ===2) !== undefined)
    {
        car2.position[0] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = [2];
    }
    else if (tile.directions.find(dir => dir ===4) !== undefined)
    {
        car2.position[0] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = [4];
    }
}
function eastCar2(){
    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir ===2) !== undefined)
    {
        car2.position[0] += 1;
    }
    else if (tile.directions.find(dir => dir ===3) !== undefined)
    {
        car2.position[1] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = [3];
    }
    else if (tile.directions.find(dir => dir ===1) !== undefined)
    {
        car2.position[1] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = [1];
    }
}
function southCar2(){
    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir ===3) !== undefined)
    {
        car2.position[1] += 1;
    }
    else if (tile.directions.find(dir => dir ===4) !== undefined)
    {
        car2.position[0] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = [4];
    }
    else if (tile.directions.find(dir => dir ===2) !== undefined)
    {
        car2.position[0] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = [2];
    }
}
function westCar2() {

    let x = car2.position[0];
    let y = car2.position[1];
    let tile = map[y][x];
    if (tile.directions.find(dir => dir === 4) !== undefined) {
        car2.position[0] -= 1;
    } else if (tile.directions.find(dir => dir === 1) !== undefined) {
        car2.position[1] -= 1;
        car2.speed = car2.speed / 2;
        car2.direction = [1];
    } else if (tile.directions.find(dir => dir === 3) !== undefined) {
        car2.position[1] += 1;
        car2.speed = car2.speed / 2;
        car2.direction = [3];
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