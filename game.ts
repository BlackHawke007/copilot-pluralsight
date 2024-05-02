

class Game {
    canvas = <HTMLCanvasElement>document.getElementById('game-board');
    ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    snake = new Snake();
    food : Food;

    constructor() {
        this.food = new Food(this.snake);
    }

    start() {
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.snake.update();
            this.snake.body.forEach(part => {
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(part.x, part.y, 20, 20);
            });
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.food.position.x, this.food.position.y, 20, 20);
            if (this.snake.body[0].x === this.food.position.x && this.snake.body[0].y === this.food.position.y) {
                this.food.position = this.food.randomPosition();
                let tail = { ...this.snake.body[this.snake.body.length - 1] };
                this.snake.body.push(tail);
            }
        }, 200);

        window.addEventListener('keydown', e => {
            this.snake.changeDirection(e.key);
        });
    }
}

const game = new Game();
game.start();