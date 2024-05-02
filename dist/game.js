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
        this.food = new Food(this.snake);
    }
    Game.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.snake.update();
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
            }
        }, 200);
        window.addEventListener('keydown', function (e) {
            _this.snake.changeDirection(e.key);
        });
    };
    return Game;
}());
var game = new Game();
game.start();
