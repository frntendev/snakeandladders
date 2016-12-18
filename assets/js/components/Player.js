/**
 *
 * Author : Sepehr Aliakbary
 * A class that Holds Player Component ...
 *
 * @class Player
 */
let Player = (function () {
    'use strict';
    function Player(name) {
        // enforces new
        if (!(this instanceof Player)) {
            return new Player(name);
        }
        // constructor body
        this.name = name;
        var _position = 0;
        var _nThrows = 0;
        var _sixCount = 0;
        var _nLaddersClimbed = 0;
        var _nSnakeEncountered = 0;
        this.setPosition = function (position) {
            _position = position;
        };
        this.getPosition = function () {
            return _position;
        };
        this.incrementThrowCount = function () {
            _nThrows++;
        };
        this.getThrowCount = function () {
            return _nThrows;
        };
        this.incrementSixCount = function () {
            _sixCount++;
        };
        this.getSixCount = function () {
            return _sixCount;
        };
        this.incrementLadderClimbedCount = function () {
            _nLaddersClimbed++;
        };
        this.getLadderClimbedCount = function () {
            return _nLaddersClimbed;
        };
        this.incrementSnakeEncounterCount = function () {
            _nSnakeEncountered++;
        };
        this.getSnakeEncounterCount = function () {
            return _nSnakeEncountered;
        };
    }
    Player.prototype.bestThrows = function (position) {
        let bestThrows = [];

        let snakes = arguments[1];
        let ladders = arguments[2];

        if (!snakes || !ladders) {
            console.warn("Pass necessary parameters. e.g. snakes,ladders,etc.");
            return [];
        }

        let visited = [];
        let i = 0;

        for (i = 0; i < 100; i++) {
            visited[i] = false;
        }

        let queue = []; // JS queue using array's Array.prototype.shift() method

        queue.push(position - 1);

        while (queue.length > 0) {
            let currentPosition = queue.shift();

            if (currentPosition == 99) break;

            for (i = currentPosition + 1; (i <= currentPosition + 6) && (i < 100); i++) {
                if (!visited[i]) {
                    visited[i] = true;

                    let connectionFlag = false;
                    snakes.forEach(function (snake) {
                        if (i == snake.getHead()) {
                            connectionFlag = true;
                            queue.push(snake.getTail());
                        }
                    });
                    ladders.forEach(function (ladder) {
                        if (i == ladder.getBottom()) {
                            connectionFlag = true;
                            queue.push(ladder.getTop());
                        }
                    });

                    if (!connectionFlag) {
                        queue.push(i);
                        bestThrows.push(i - currentPosition);
                    }
                }
            }
        }
        return bestThrows;
    }
    return Player;
}());