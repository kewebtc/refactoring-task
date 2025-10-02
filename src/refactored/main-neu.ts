enum Direction{
    NORTH="NORTH",EAST="EAST", SOUTH="SOUTH", WEST="WEST"
}


interface Point{
    x:number;
    y:number;
}

class Car  {
    public static directionPriority: Record<Direction,Direction[]> = {
        [Direction.NORTH]: [Direction.NORTH, Direction.EAST, Direction.WEST],
        [Direction.EAST]:  [Direction.EAST, Direction.SOUTH, Direction.NORTH],
        [Direction.SOUTH]: [Direction.SOUTH, Direction.WEST, Direction.EAST],
        [Direction.WEST]:  [Direction.WEST, Direction.NORTH, Direction.SOUTH],
    };
    public ascii: string;
    public position: Point;
    public speed: number;
    public direction: Direction;

    constructor(ascii: string, position: Point, direction: Direction) {
        this.ascii = ascii;
        this.position = position;
        this.speed = 0;
        this.direction = direction;
    }

    public move(map:MapTile[][]):void{
        this.speed += 0.2;
        if (this.speed > 1) {
            this.speed = 1;
        }
        if (this.speed > 0.5) {
            const currentTile = map[this.position.y][this.position.x];
            const nextDirection = Car.directionPriority[this.direction]
                .find(dir => currentTile.directions.includes(dir));
            // Falls gültige Richtung existiert
            if (nextDirection) {
                if (nextDirection === Direction.NORTH) {
                    this.position.y -= 1;
                } else if (nextDirection === Direction.SOUTH) {
                    this.position.y += 1;
                } else if (nextDirection === Direction.EAST) {
                    this.position.x += 1;
                } else if (nextDirection === Direction.WEST) {
                    this.position.x -= 1;
                }
                // Falls abbiegen: Bremsen + Richtung ändern
                if (nextDirection !== this.direction) {
                    this.speed /= 2;
                    this.direction = nextDirection;
                }
            }
        }
    }
}

type MapTile = {
    id: string;
    directions: Direction[];
}

class Simulation {
    public iterationCounter: number;

    constructor() {
        this.iterationCounter = 0;
    }

    run(map:MapTile[][], carOne:Car,carTwo:Car) {
        let carsCrashed: boolean = false;
        while (!carsCrashed) {
            carOne.move(map);
            carTwo.move(map);
            this.iterationCounter++;
            if (this.iterationCounter > 2) {
                if (carOne.position.y === carTwo.position.y &&
                    carOne.position.x === carTwo.position.x) {
                    carsCrashed = true;
                    console.log("OH NO A CAR CRASH")
                }
            }
            //Map generating
            for (let y = 0; y < map.length; y++) {
                let row = '';
                for (let x = 0; x < map[y].length; x++) {
                    if (x === carOne.position.x && y === carOne.position.y) {
                        row += carOne.ascii;
                    } else if (x === carTwo.position.x && y === carTwo.position.y) {
                        row += carTwo.ascii;
                    } else
                        row += map[y][x].id;
                }
                console.log(row.trim());
            }
            console.log("car1 (B) position: " + carOne.position, "| car2 (R) position: " + carTwo.position);
            console.log("car1 (B)speed: " + carOne.speed, "| car2 (R) speed: " + carTwo.speed);
            console.log("car1 (B)direction: " + carOne.direction.toLowerCase(), "| car2 (R) direction: " + carTwo.direction.toLowerCase());
            console.log("_".repeat(50) + "Page " + this.iterationCounter);
        }
        console.log("    █████████████████████████████████");
        console.log("    ████ B O O M ████████████████████");
        console.log("    █████████████████████████████████")
        this.iterationCounter++;
        console.log("_".repeat(50) + "Page " + this.iterationCounter)
    }
}

class Game{
    private readonly map:MapTile[][];
    private readonly carOne: Car;
    private readonly carTwo: Car;
    private simulation:Simulation;

    constructor(){
        //Initialisierung aller Objekte
        this.carOne= new Car("B",{x:3,y:2},Direction.EAST);
        this.carTwo = new Car("R",{x:3,y:2},Direction.WEST);
        this.simulation = new Simulation();
        this.map = [
            [{id: "\u2554", directions: [Direction.EAST, Direction.SOUTH],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2566", directions: [Direction.EAST, Direction.SOUTH, Direction.WEST],},{id: "\u2550", directions: [Direction.EAST, Direction.WEST],},{id: "\u2557", directions: [Direction.SOUTH, Direction.WEST],}],
            [{id: "\u2551", directions: [Direction.NORTH, Direction.SOUTH],}, {id: " ", directions: [],}, {id: " ", directions: [],}, {id: "\u255A", directions: [Direction.NORTH, Direction.EAST],}, {id: "\u2566", directions: [Direction.EAST, Direction.SOUTH, Direction.WEST],}, {id: "\u255D", directions: [Direction.NORTH, Direction.WEST],}],
            [{id: "\u255A", directions: [Direction.NORTH, Direction.EAST],}, {id: "\u2550", directions: [Direction.EAST, Direction.WEST],}, {id: "\u2550", directions: [Direction.EAST, Direction.WEST],}, {id: "\u256B", directions: [Direction.EAST, Direction.WEST],}, {id: "\u255D", directions: [Direction.NORTH, Direction.WEST],}, {id: " ", directions: [],}],]
    }

    public startGame(){
        this.simulation.run(this.map, this.carOne,this.carTwo);
    }
}

const game:Game = new Game();
game.startGame();