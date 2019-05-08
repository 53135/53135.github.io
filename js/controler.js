
let randomRow = randomInteger(0, taille - 1);
let randomColumn = randomInteger(0, taille - 1);
let positionHead = new Position(randomRow, randomColumn);
let tabCorps = [new Position(0, 0)];
let snake = new Snake(positionHead, UP, tabCorps);
let keycodeLeft = 37;
let keycodeUp = 38;
let keycodeRight = 39;
let keycodeDown = 40;
let keycodePress = checkFirstDirection();
let tabFruct = [];
let gameOver = false;
let score = 0;
let bestScore = 0;
let pointScoreFive = 10;
let PointScoreFruct = 50;
let gotMove = false;
let tabBlackFruct = [];


/**
 * Vérifie la touche pressé du clavier en fonction de son keycode. Vérifie bien que les serpent ne
 * puisse pas aller dans le sens contraire. Dès que le joueur appuie sur une des touches la direction 
 * ne peut être changé.
 * @param {String} e 
 */
function keyDirection(e) {
    if (e.keyCode != keycodePress && e.keyCode != reverseDirection(keycodePress) && !gotMove) {
        switch (e.keyCode) {
            case keycodeLeft:
                keycodePress = keycodeLeft;
                console.log("left");
                snake.direction = LEFT;
                gotMove = true;
                break;
            case keycodeUp:
                keycodePress = keycodeUp;
                console.log("up");
                snake.direction = UP;
                gotMove = true;
                break;
            case keycodeRight:
                keycodePress = keycodeRight;
                console.log("right");
                snake.direction = RIGHT;
                gotMove = true;
                break;
            case keycodeDown:
                keycodePress = keycodeDown;
                console.log("down");
                snake.direction = DOWN;
                gotMove = true;
                break;
        }
    }
}

/**
 * Donne le keycode de la première direction du serpent.
 */
function checkFirstDirection() {
    let direction = snake.direction;
    let keycodePress = 0;
    switch (direction) {
        case LEFT:
            keycodePress = keycodeLeft;
            break;
        case UP:
            keycodePress = keycodeUp;
            break;
        case RIGHT:
            keycodePress = keycodeRight;
            break;
        case DOWN:
            keycodePress = keycodeDown;
            break;
    }
    return keycodePress;
}

/**
 * Donne le keycode de la direction opposée du serpent.
 * @param {number} le code clavier.
 */
function reverseDirection(keycodePress) {
    let reverseDirection = 0;
    switch (keycodePress) {
        case keycodeLeft:
            reverseDirection = keycodeRight;
            break;
        case keycodeUp:
            reverseDirection = keycodeDown;
            break;
        case keycodeRight:
            reverseDirection = keycodeLeft;
            break;
        case keycodeDown:
            reverseDirection = keycodeUp;
            break;
    }
    return reverseDirection;
}

/**
 * Fonction qui gêre tout le jeu. Elle charge le meilleure score 
 * enregistré. Si le jeu n'est pas terminé: elle crée un fruit, fait bouger le serpent,
 * vérifie si le jeu n'est terminé, vérifie si la tête du serpent est sur un fruit et pour 
 * finir met à jour la vue. Sinon sauvegarde le score si il à battu les précédent record.
 */
function game() {
    loadBestScore();
    if (!gameOver) {
        createFruct();
        createFructBlack();
        snake.move();
        isGameOver();
        headOnFruct();
        headOnBlackFruct();
        updateView();
    } else {
        saveBestScore();
    }
}

/**
 * Crée un fruit une fois sur 40 et l'ajoute au tableau de fruit.
 */
function createFruct() {
    let randomNb = randomInteger(1, 40);
    if (randomNb == 25) {
        let fruct = fructNotOnSnake();
        tabFruct.unshift(fruct);
    }
}

function createFructBlack() {
    let randomNb = randomInteger(1, 40);
    if (randomNb == 25) {
        let fruct = fructNotOnSnake();
        tabBlackFruct.unshift(fruct);
    }
}

/**
 * Vérifie que la position du fruit que nous voulons créer soit bien sur une case vide et que 
 * ce ne soit pas sur le serepent. Elle return un fruit avec une position qui n'est pas sur 
 * le serpent.
 */
function fructNotOnSnake() {
    let ok = false;
    let position = new Position(0, 0);
    while (!ok) {
        position = new Position(randomInteger(0, taille - 1), randomInteger(0, taille - 1));
        if ($(`#${position.row}-${position.column}`).attr("class") == "case") {
            ok = true;
        }
    }
    return new Fruct(position);
}

/**
 * Crée un nombre entier entre un minimum et un maximum.
 * @param {number} min  de l'intervalle
 * @param {number} max  de l'intervalle
 */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Vérifie si la tête du serpent est sur un fruit. Si elle y est elle supprime le fruit du tableau 
 * de fruit, augmente le score de 50 et passe "grow = true".
 */
function headOnFruct() {
    for (let i = 0; i < tabFruct.length; i++) {
        if (tabFruct[i].position.row == snake.head.row && tabFruct[i].position.column == snake.head.column) {
            grow = true;
            tabFruct.splice(i, 1);
            updateScore(PointScoreFruct);
        }
    }
}

function headOnBlackFruct() {
    for (let i = 0; i < tabBlackFruct.length; i++) {
        if (tabBlackFruct[i].position.row == snake.head.row && tabBlackFruct[i].position.column == snake.head.column) {
            tabBlackFruct.splice(i, 1);
            snake.tail.splice(1,snake.tail.length);
        }
    }
}

/**
 * Cette fonction passe "grow = true" et augmente le score de 10 si le jeu n'est pas 
 * terminé.
 */
function growFiveSecond() {
    if (!gameOver) {
        grow = true;
        updateScore(pointScoreFive);
    }
}

/**
 * Vérifie si la tête du serpent n'est pas sur son corps si oui elle passe 
 * "gameOver = true".
 */
function isGameOver() {
    for (let i = 0; i < snake.tail.length; i++) {
        if (snake.tail[i].row == snake.head.row && snake.tail[i].column == snake.head.column) {
            gameOver = true;
        }
    }
}

/**
 * Met à jour le score.
 * @param {number} pointScore  le nbr de points que nous voulons rajouter.
 */
function updateScore(pointScore) {
    score += pointScore;
}

/**
 * Suavegarde le score si il dépasse le précédent meilleur record.
 */
function saveBestScore() {
    let stringScore = score.toString();
    if (bestScore < score) {
        localStorage.setItem("bestScore", stringScore);
    }
}

/**
 * Charge le meilleur score.
 */
function loadBestScore() {
    bestScore = localStorage.getItem("bestScore");
    if (bestScore == null) {
        bestScore = "0";
    }
}

/**
 * Rafraichie la page.
 */
function reloadPage() {
    location.reload(true);
}