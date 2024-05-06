class Obstacle {
    position: { x: number, y: number };

    constructor(private snake: Snake, private game: Game) {
        this.position = this.randomPosition();
    }

    randomPosition() {
        let position;
        do {
            position = {
                x: Math.floor(Math.random() * 20) * 20,
                y: Math.floor(Math.random() * 20) * 20
            };
        } while (this.positionOccupied(position));
        return position;
    }

    positionOccupied(pos: { x: number, y: number }) {
        for (let segment of this.snake.body) {
            if (segment.x === pos.x && segment.y === pos.y) {
                return true;
            }
        }
        // if (this.game.food.position.x === pos.x && this.game.food.position.y === pos.y) {
        //     return true;
        // }
        return false;
    }
}

