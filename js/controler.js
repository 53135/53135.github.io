
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

/**
 * Vérifie la touche pressé du clavier et applique le mouvement.
 * @param {*} e 
 */
function keyDirection(e) {
    if (e.keyCode != keycodePress && e.keyCode != reverseDirection(keycodePress)) {
        switch (e.keyCode) {
            case keycodeLeft:
                keycodePress = keycodeLeft;
                console.log("left");
                snake.direction = LEFT;
                break;
            case keycodeUp:
                keycodePress = keycodeUp;
                console.log("up");
                snake.direction = UP;
                break;
            case keycodeRight:
                keycodePress = keycodeRight;
                console.log("right");
                snake.direction = RIGHT;
                break;
            case keycodeDown:
                keycodePress = keycodeDown;
                console.log("down");
                snake.direction = DOWN;
                break;
        }
    }
}

/**
 * Donne le code clavier de la première direction du serpent.
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
 * Donne le code clavier inverse du code clavier en parametre.
 * @param {keycodePress} le code clavier.
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

function game() {
    loadBestScore();
    if (!gameOver) {
        createFruct();
        snake.move();
        isGameOver();
        headOnFruct();
        updateView();
    } else {
        saveBestScore();
    }
}

function createFruct() {
    let randomNb = randomInteger(1, 40);
    if (randomNb == 25) {
        let fruct = fructNotOnSnake();
        tabFruct.unshift(fruct);
    }
}

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

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function headOnFruct() {
    for (let i = 0; i < tabFruct.length; i++) {
        if (tabFruct[i].position.row == snake.head.row && tabFruct[i].position.column == snake.head.column) {
            grow = true;
            tabFruct.splice(i, 1);
            updateScore(PointScoreFruct);
        }
    }
}

function growFiveSecond() {
    if (!gameOver) {
        grow = true;
        updateScore(pointScoreFive);
    }
}

function isGameOver() {
    for (let i = 0; i < snake.tail.length; i++) {
        if (snake.tail[i].row == snake.head.row && snake.tail[i].column == snake.head.column) {
            gameOver = true;
        }
    }
}

function updateScore(pointScore) {
    score += pointScore;
}

function saveBestScore() {
    let stringScore = score.toString();
    if (bestScore < score) {
        localStorage.setItem("bestScore", stringScore);
    }
}

function loadBestScore() {
    bestScore = localStorage.getItem("bestScore");
    if(bestScore == null){
        bestScore = "0";
    }
}