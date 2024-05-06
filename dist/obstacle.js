"use strict";
var Obstacle = /** @class */ (function () {
    function Obstacle(snake, game) {
        this.snake = snake;
        this.game = game;
        this.position = this.randomPosition();
    }
    Obstacle.prototype.randomPosition = function () {
        var position;
        do {
            position = {
                x: Math.floor(Math.random() * 20) * 20,
                y: Math.floor(Math.random() * 20) * 20
            };
        } while (this.positionOccupied(position));
        return position;
    };
    Obstacle.prototype.positionOccupied = function (pos) {
        for (var _i = 0, _a = this.snake.body; _i < _a.length; _i++) {
            var segment = _a[_i];
            if (segment.x === pos.x && segment.y === pos.y) {
                return true;
            }
        }
        // if (this.game.food.position.x === pos.x && this.game.food.position.y === pos.y) {
        //     return true;
        // }
        return false;
    };
    return Obstacle;
}());
