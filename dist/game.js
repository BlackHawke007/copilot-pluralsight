"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.getElementById('game-board');
        this.ctx = this.canvas.getContext('2d');
        this.snake = new Snake();
        this.obstacles = [];
        this.score = 0;
        //add obstacles
        for (var i = 0; i < 5; i++) {
            this.obstacles.push(new Obstacle(this.snake, this));
        }
        //init food
        this.food = new Food(this.snake, this.obstacles);
    }
    Game.prototype.start = function () {
        var _this = this;
        this.gameInterval = setInterval(function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.snake.update();
            if (_this.checkCollision()) {
                _this.gameOver();
            }
            _this.snake.body.forEach(function (part) {
                _this.ctx.fillStyle = 'white';
                _this.ctx.fillRect(part.x, part.y, 20, 20);
            });
            _this.ctx.fillStyle = 'red';
            _this.ctx.fillRect(_this.food.position.x, _this.food.position.y, 20, 20);
            if (_this.snake.body[0].x === _this.food.position.x && _this.snake.body[0].y === _this.food.position.y) {
                _this.food.position = _this.food.randomPosition();
                var tail = __assign({}, _this.snake.body[_this.snake.body.length - 1]);
                _this.snake.body.push(tail);
                _this.score++;
                var scoreElement = document.getElementById('score');
                if (scoreElement) {
                    scoreElement.textContent = "Score: ".concat(_this.score);
                }
            }
            _this.obstacles.forEach(function (obstacle) {
                _this.ctx.fillStyle = 'blue';
                _this.ctx.fillRect(obstacle.position.x, obstacle.position.y, 20, 20);
                if (_this.snake.body[0].x === obstacle.position.x && _this.snake.body[0].y === obstacle.position.y) {
                    _this.gameOver();
                }
            });
        }, 200);
        window.addEventListener('keydown', function (e) {
            _this.snake.changeDirection(e.key);
        });
    };
    Game.prototype.checkCollision = function () {
        var head = this.snake.body[0];
        for (var i = 1; i < this.snake.body.length; i++) {
            if (this.snake.body[i].x === head.x && this.snake.body[i].y === head.y) {
                return true; // Collision with self
            }
        }
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            if (obstacle.position.x === head.x && obstacle.position.y === head.y) {
                return true; // Collision with obstacle
            }
        }
        return false;
    };
    Game.prototype.gameOver = function () {
        // Handle game over condition here.
        clearInterval(this.gameInterval);
        alert("Game Over");
    };
    return Game;
}());
var game = new Game();
game.start();
