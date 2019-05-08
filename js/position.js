
/**
 * Cette classe permet créer une position avec une ligne et une colonne.
 */
class Position {

    /**
     * Construit l'objet "Position".
     * @param {number} row 
     * @param {number} column 
     */
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    /**
     * Donne la valeur de la ligne de la position.
     */
    get row() {
        return this._row;
    }

    /**
     * Donne la valeur de la colonne de la position.
     */
    get column() {
        return this._column;
    }
}