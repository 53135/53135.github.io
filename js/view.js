
let taille = 15;

/**
 * Dès que la page est chargé: crée une grille, affiche l'interface initial, prend en compte le clavier 
 * et crée deux timer. Le premier appelle la fonction game toutes les 150ms et le second la fonction
 * growFiveSecond toutes les 5s.
 */
$(document).ready(function () {
    createGrid(taille);
    startView();
    updateView();
    document.onkeydown = keyDirection;
    setInterval(game, 150);
    setInterval(growFiveSecond, 5000);
})

/**
 * Crée la grille de jeu. Avec pour chaque case crée on lui ajoute un id qui lui est propre qui est sa position
 * et une classe qui est la classe de base.
 * @param {number} x 
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
 * Affiche la tête du serpent dans la grille grâce à l'ajout d'une classe.
 */
function snakeHead() {
    $(`#${snake.head.row}-${snake.head.column}`).addClass("caseHead");
}

/**
 * Affiche le corps du serpent dans la grille grâce à l'ajout d'une classe à 
 * chaque valeur du tableau corps du serpent.
 */
function snakeBody() {
    for (let position of snake.tail) {
        $(`#${position.row}-${position.column}`).addClass("caseBody");
    }
}

/**
 * Affiche les fruits dans la grille grâce à l'ajout d'une classe à chaque valeur 
 * du tableau de fruit.
 */
function fruct() {
    for (let fruct of tabFruct) {
        $(`#${fruct.position.row}-${fruct.position.column}`).addClass("fruct");
    }
}

function blackFruct() {
    for (let fruct of tabBlackFruct) {
        $(`#${fruct.position.row}-${fruct.position.column}`).addClass("blackFruct");
    }
}

/**
 * Met à jour la vue.
 */
function updateView() {
    $(".caseHead").removeClass("caseHead");
    $(".caseBody").removeClass("caseBody");
    $(".fruct").removeClass("fruct");
    $(".blackFruct").removeClass("blackFruct");
    $(".theScore").text(`${score}`);
    $(".bestScore").text(`${bestScore}`);
    snakeHead();
    snakeBody();
    fruct();
    blackFruct();
    gameOverView();
}

/**
 * L'interface de début de jeu. On cache les messages de félicitations et 
 * le button rejouer.
 */
function startView() {
    $("#viewGiveScore").hide();
    $("#viewGiveBestScore").hide();
    $("button").hide();
}

/**
 * L'interface de fin de jeu. Il est different si le joueur à battu le précédent meilleure score.
 */
function gameOverView() {
    if (gameOver) {
        if (bestScore < score) {
            $("#viewGiveBestScore").show();
        } else {
            $("#viewGiveScore").show();
        }
        $("button").show();
    }
}