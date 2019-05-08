
/**
 * Cette classe nous permet de créer un fruit à une position.
 */
class Fruct {

    /**
     * Construit l'objey "Fruct".
     * @param {Position} position du fruit
     */
    constructor(position) {
        this._position = position;
    }

    /**
     * Donne la position du fruit.
     */
    get position() {
        return this._position;
    }
}