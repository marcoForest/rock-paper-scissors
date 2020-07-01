const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const DIV = "div";
const IMG = "img";
const PLAYER1 = "player1";
const PLAYER2 = "player2";
const TIE = "Tie";
const CHOICE_ENABLED = "choice-enabled";
const CHOICE_DISABLED = "choice-disabled";
const CHOICE_SELECTED = "choice-selected";
const CHOICE_WINNER = "choice-winner";
const CHOICE_LOSER = "choice-loser";
const SEPARATOR = "-";
const choicesBasic = [ROCK, PAPER, SCISSORS];
/**
 * Become premium for the extension pack
 */
const SPOCK = "spock";
const LIZARD = "lizard";
const choicesPremium = [ROCK, SPOCK, PAPER, LIZARD, SCISSORS];
var choices = choicesBasic;
var premium = false;

/**
 * Enables/disables premium features, Spock and Lizard join the fight
 */
function premiumMode() {
    premium = !premium;
    if(premium){
        document.getElementById("premium").className = "clicked";
        choices = choicesPremium;
    } else {
        document.getElementById("premium").className = "";
        choices = choicesBasic;
    }
}
exports.premiumMode = premiumMode;

/**
 * Logic to determine the winner between two choices
 */
function play(player1Choice, player2Choice) {
    const player1Index = choices.indexOf(player1Choice);
    const player2Index = choices.indexOf(player2Choice);
    if (player1Index == player2Index) {
        return TIE;
    }
    if (modulo((player1Index - player2Index), choices.length) < choices.length / 2) {
        return PLAYER1;
    } else {
        return PLAYER2;
    }
}
exports.play = play;

/**
 * Hides the main menu, shows the game
 * and creates the choices for PCvsPC mode
 * (all choices are disabled for the user that can only triggers the game)
 */
function pcVsPcMode() {
    switchPanels();
    addBackButtonListener();
    createChoices(document.getElementById(PLAYER1), PLAYER1, CHOICE_DISABLED);
    createChoices(document.getElementById(PLAYER2), PLAYER2, CHOICE_DISABLED);
    document.getElementById("play").style.display = "block";
}

/**
 * Hides the main menu, shows the game
 * and creates the choices for PlayervsPC mode
 * (user choices are enabled, pc choices are disabled)
 * The game is triggered when the user makes a choice
 */
function playerVsPcMode() {
    switchPanels();
    addBackButtonListener();
    createChoices(document.getElementById(PLAYER1), PLAYER1, CHOICE_ENABLED);
    createChoices(document.getElementById(PLAYER2), PLAYER2, CHOICE_DISABLED);
    playerVsPcGame();
    document.getElementById("choice-message").style.display = "block";
}

/**
 * Add listeners to buttons to enable the selection for each element in choices vector
 */
function playerVsPcGame() {
    enableChoices(PLAYER1);
    disableChoices(PLAYER2);
    choices.forEach(function(item, index) {
        document.getElementById(PLAYER1 + SEPARATOR + item).className = CHOICE_ENABLED;
        document.getElementById(PLAYER1 + SEPARATOR + item).addEventListener("click", function() {
            //Cleans selections before a new game
            enableChoices(PLAYER1);
            disableChoices(PLAYER2);
            showResult(item, generateChoicePC(PLAYER2));
        })
    });
}

/**
 * Triggered by the play button in PCvsPC mode
 * generates two pc selections and shows the results
 */
function pcVsPcGame() {
    disableChoices(PLAYER1);
    disableChoices(PLAYER2);
    showResult(generateChoicePC(PLAYER1), generateChoicePC(PLAYER2));
}

/**
 * Shows the result of the game
 */
function showResult(p1Choice, p2Choice) {
    switch(play(p1Choice, p2Choice)){
        case PLAYER1:
            gameResult(PLAYER1, PLAYER2, p1Choice, p2Choice);
            break;
        case PLAYER2:
            gameResult(PLAYER2, PLAYER1, p2Choice, p1Choice);
            break;
        default: 
            document.getElementById("result-message").innerText = TIE;
    }
}

/**
 * Changes states for the winner and the loser choices
 */
function gameResult(winner, loser, winnerChoice, loserChoice) {
    document.getElementById(winner + SEPARATOR + winnerChoice).className = CHOICE_WINNER;
    document.getElementById(loser + SEPARATOR  + loserChoice).className = CHOICE_LOSER;
    document.getElementById("result-message").innerText =
     winner + " wins";
}
exports.gameResult = gameResult;

/* UTILS */

/**
 * Random generator for pc selection
 * @param {*} player, name of the player (1 or 2) 
 */
function generateChoicePC(player) {
    const computerIndex = Math.floor(Math.random() * choices.length);
    document.getElementById(player + SEPARATOR + choices[computerIndex]).className = CHOICE_SELECTED;
    return choices[computerIndex];
}

/**
 * Calculates a mod b
 */
function modulo(a, b) {
    mod = a % b;
    return (mod < 0) ? mod + b : mod;
}


/**
 * Hide main menu and show the game and back button
 */
function switchPanels() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("premium").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("back-button").style.display = "block";
    document.getElementById("result-message").innerText = "";
}

/**
 * Back button will turn to main menu while cleaning the choices
 */
function addBackButtonListener() {
    document.getElementById("back-button").addEventListener("click", function() {
        document.getElementById("game").style.display = "none";
        document.getElementById("main-menu").style.display = "block";
        document.getElementById("premium").style.display = "block";
        document.getElementById("back-button").style.display = "none";
        document.getElementById("play").style.display = "none";
        document.getElementById("choice-message").style.display = "none";
        deleteChoices(PLAYER1);
        deleteChoices(PLAYER2);
    })
}

/**
 * Creates choices for a single player based on the choices vector
 * @param {*} parentDiv, div in which the new choices will be added
 * @param {*} player, player name
 * @param {*} className, desired state for the choice 
 */
function createChoices(parentDiv, player, className) {
    choices.forEach(function(item, index) {
        var choice = document.createElement(DIV);
        choice.className = className;
        choice.id = player + SEPARATOR + item;
        choice.title = item;
        var img = document.createElement(IMG);
        img.src = "img/" + item + ".png";
        choice.appendChild(img);
        parentDiv.appendChild(choice);
    });
}
exports.createChoices = createChoices;

/**
 * Disables all choices for a given player
 */
function disableChoices(player) {
    choices.forEach(function(item, index) {
        document.getElementById(player + SEPARATOR + item).className = CHOICE_DISABLED;
    });
}
exports.disableChoices = disableChoices;

/**
 * Enables all choices for a given player
 */
function enableChoices(player) {
    choices.forEach(function(item, index) {
        document.getElementById(player + SEPARATOR + item).className = CHOICE_ENABLED;
    });
}
exports.enableChoices = enableChoices;

/**
 * Deletes all choices for a given player
 */
function deleteChoices(player) {
    choices.forEach(function(item, index) {
        document.getElementById(player + SEPARATOR + item).remove();
    });
}
exports.deleteChoices = deleteChoices;