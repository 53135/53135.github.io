
let UP = new Position(-1, 0);
let DOWN = new Position(1, 0);
let LEFT = new Position(0, -1);
let RIGHT = new Position(0, 1);
let grow = false;

class Snake {

    constructor(head, direction, tail) {
        this._head = head;
        this._direction = direction;
        this._tail = tail;
    }

    get head() {
        return this._head;
    }

    get direction() {
        return this._direction;
    }

    get tail() {
        return this._tail;
    }

    set direction(x) {
        this._direction = x;
    }

    move() {
        let posHead = this._head;
        if (grow) {
            this._head = this.nextPosition(this._head, this._direction);
            this._tail.unshift(posHead);
            grow = false;
        } else {
            this._head = this.nextPosition(this._head, this._direction);
            this._tail.unshift(posHead);
            this._tail.pop();
        }
        gotMove = false;
    }

    nextPosition(pos1, pos2) {
        let row = pos1.row + pos2.row;
        let column = pos1.column + pos2.column;
        if (row >= taille) {
            row = 0;
        }
        if (row < 0) {
            row = taille - 1;
        }
        if (column >= taille) {
            column = 0;
        }
        if (column < 0) {
            column = taille - 1;
        }
        return new Position(row, column);
    }
}