class Food {
    // The position of the food, represented as coordinates on the canvas.
    position: { x: number, y: number };

    snake: Snake

    constructor(_snake: Snake) {
        this.snake = _snake;
        this.position = this.randomPosition();
    }

    // The randomPosition function generates a random position for the food.
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

    // The positionOccupied function checks if a position is occupied by the snake.
    positionOccupied(pos: { x: number, y: number }) {
        for (let segment of this.snake.body) {
            if (segment.x === pos.x && segment.y === pos.y) {
                return true;
            }
        }
        return false;
    }
}