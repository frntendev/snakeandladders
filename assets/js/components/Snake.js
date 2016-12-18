/**
 *
 * Author : Sepehr Aliakbary
 * A class that Holds Snake Component ...
 *
 * @class Snake
 */
let Snake = (function () {
    'use strict';
    function Snake(head, tail) {
        // enforces new
        if (!(this instanceof Snake)) {
            return new Snake(head, tail);
        }
        let _head = head;
        let _tail = tail;
        this.getHead = function () {
            return _head;
        }

        this.getTail = function () {
            return _tail;
        }
    }
    Snake.prototype.eat = function (player) {
        if (player instanceof Player) {
            if (this.getHead() != player.getPosition()) throw Error("Position mismatch");
            console.log("Snake bit %s", player.name);
            console.log(player.name, " moving down to: ", 1);
            player.setPosition(1);
            player.incrementSnakeEncounterCount();
        } else {
            throw Error("Snake only eats Player");
        }
    };
    return Snake;
}());
let snakes = new Array();
