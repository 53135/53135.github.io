
let taille = 15;

$(document).ready(function () {
    createGrid(taille);
    startView();
    updateView();
    document.onkeydown = keyDirection;
    setInterval(game, 150);
    setInterval(growFiveSecond, 5000);
})

/**
 * Crée la grille de jeu.
 * @param {*} x 
 */
function createGrid(x) {
    for (let row = 0; row < x; row++) {
        for (let column = 0; column < x; column++) {
            $("#game").append("<div id='rowColumn' class='case'></div>");
            $("#rowColumn").attr("id", `${row}-${column}`);
        }
    }
    $(".case").width(500 / x);
    $(".case").height(500 / x);
}

/**
 * Place la tête du serpent sur le plateau de jeu.
 */
function snakeHead() {
    $(`#${snake.head.row}-${snake.head.column}`).addClass("caseHead");
}

function snakeBody() {
    for (let position of snake.tail) {
        $(`#${position.row}-${position.column}`).addClass("caseBody");
    }
}

function fruct() {
    for (let fruct of tabFruct) {
        $(`#${fruct.position.row}-${fruct.position.column}`).addClass("fruct");
    }
}

/**
 * Met à jour la vue.
 */
function updateView() {
    $(".caseHead").removeClass("caseHead");
    $(".caseBody").removeClass("caseBody");
    $(".fruct").removeClass("fruct");
    $(".theScore").text(`${score}`);
    $(".bestScore").text(`${bestScore}`);
    snakeHead();
    snakeBody();
    fruct();
    gameOverView();
}

function startView() {
    $("#viewGiveScore").hide();
    $("#viewGiveBestScore").hide();
}

function gameOverView() {
    if (gameOver) {
        if (bestScore < score) {
            $("#viewGiveBestScore").show();
        } else {
            $("#viewGiveScore").show();
        }
    }
}