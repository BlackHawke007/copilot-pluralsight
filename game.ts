

class Game {
    canvas = <HTMLCanvasElement>document.getElementById('game-board');
    ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    snake = new Snake();
    food : Food;
    obstacles: Obstacle[] = [];
    gameInterval: any;
    score = 0;


    constructor() {
        //add obstacles
        for (let i = 0; i < 5; i++) {
            this.obstacles.push(new Obstacle(this.snake, this));
        }

        //init food
        this.food = new Food(this.snake, this.obstacles);
    }

    start() {
        this.gameInterval = setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.snake.update();
            if (this.checkCollision()) {
                this.gameOver();
            }
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
                
                this.score++;
                let scoreElement = document.getElementById('score');
                if (scoreElement) {
                    scoreElement.textContent = `Score: ${this.score}`;
                }
            }

            this.obstacles.forEach(obstacle => {
                this.ctx.fillStyle = 'blue';
                this.ctx.fillRect(obstacle.position.x, obstacle.position.y, 20, 20);
                if (this.snake.body[0].x === obstacle.position.x && this.snake.body[0].y === obstacle.position.y) {
                    this.gameOver();
                }
            });
        }, 50);

        window.addEventListener('keydown', e => {
            this.snake.changeDirection(e.key);
        });
    }

    checkCollision() {
        let head = this.snake.body[0];
        for (let i = 1; i < this.snake.body.length; i++) {
            if (this.snake.body[i].x === head.x && this.snake.body[i].y === head.y) {
                return true; // Collision with self
            }
        }
        for (let obstacle of this.obstacles) {
            if (obstacle.position.x === head.x && obstacle.position.y === head.y) {
                return true; // Collision with obstacle
            }
        }
        return false;
    }

    gameOver() {
        // Handle game over condition here.
        clearInterval(this.gameInterval);
        alert("Game Over");
    }
}

const game = new Game();
game.start();