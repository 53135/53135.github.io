
let UP = new Position(-1, 0);
let DOWN = new Position(1, 0);
let LEFT = new Position(0, -1);
let RIGHT = new Position(0, 1);
let grow = false;

/**
 * Cette classe nous permet de créer un serpent avec une tête et un corps.
 */
class Snake {

    /**
     * Construit le serpent avec une têten un corps et une direction.
     * @param {Position} head 
     * @param {Position} direction 
     * @param {Position[]} tail 
     */
    constructor(head, direction, tail) {
        this._head = head;
        this._direction = direction;
        this._tail = tail;
    }

    /**
     * Donne la tête du serpent.
     */
    get head() {
        return this._head;
    }

    /**
     * Donne la direction du serpent.
     */
    get direction() {
        return this._direction;
    }

    /**
     * Donne le corps du serpent.
     */
    get tail() {
        return this._tail;
    }

    /**
     * Change la direction du serpent par la valeur en paramètre.
     */
    set direction(x) {
        this._direction = x;
    }

    /**
     * Cette méthode nous permet de faire bouger les serpent. Si le serpent doit grandir, on change la position 
     * de sa tête, on rajoute l'ancienne position de tête dans le tableau de corps et on passe "grow = false".
     * Sinon on fait là même chose sauf que nous supprimons la position à la fin du tableau corps.
     * Passe "gotMove = false" pour qu'on puisse changer la direction dans les prochain mouvement.
     */
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

    /**
     * Cette méthode renvoie une nouvelle position. Si la ligne ou la colonne de la nouvelle
     * position n'est pas dans le tableau, elle change la ligne ou la colonne pour qu'elle appraraisse 
     * de l'autre côté. Ainsi la position renvoyé ne sort jamais du tableau de jeu.
     * @param {Position} pos1  position de départ.
     * @param {Position} pos2  position qui est la direction.
     */
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