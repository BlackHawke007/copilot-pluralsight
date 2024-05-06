"use strict";
var Food = /** @class */ (function () {
    function Food(_snake, _obstacles) {
        this.snake = _snake;
        this.obstacles = _obstacles;
        this.position = this.randomPosition();
    }
    // The randomPosition function generates a random position for the food.
    Food.prototype.randomPosition = function () {
        var position;
        do {
            position = {
                x: Math.floor(Math.random() * 20) * 20,
                y: Math.floor(Math.random() * 20) * 20
            };
        } while (this.positionOccupied(position));
        return position;
    };
    // The positionOccupied function checks if a position is occupied by the snake.
    Food.prototype.positionOccupied = function (pos) {
        for (var _i = 0, _a = this.snake.body; _i < _a.length; _i++) {
            var segment = _a[_i];
            if (segment.x === pos.x && segment.y === pos.y) {
                return true;
            }
            for (var _b = 0, _c = this.obstacles; _b < _c.length; _b++) {
                var obstacle = _c[_b];
                if (obstacle.position.x === pos.x && obstacle.position.y === pos.y) {
                    return true;
                }
            }
        }
        return false;
    };
    return Food;
}());
