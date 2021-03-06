/**
 * Test that the game follows the rules
 * play shows the winner between the 1st and the 2nd argument
 */
const IndexFunctions = require("../src/index");
test("Paper wins against rock", () => {
    expect(IndexFunctions.play("rock", "paper")).toEqual("player2");
})

test("Scissors wins against paper", () => {
    expect(IndexFunctions.play("scissors", "paper")).toEqual("player1");
})

test("Rock wins against scissors", () => {
    expect(IndexFunctions.play("rock", "scissors")).toEqual("player1");
})

test("Equal choices means a tie", () => {
    expect(IndexFunctions.play("rock", "rock")).toEqual("Tie");
    expect(IndexFunctions.play("paper", "paper")).toEqual("Tie");
    expect(IndexFunctions.play("scissors", "scissors")).toEqual("Tie");
})

/**
 * Tests DOM element's changes
 */
const { PLAYER1, CHOICE_DISABLED, DIV, ROCK, SCISSORS, CHOICE_WINNER, CHOICE_LOSER, PLAYER2, CHOICE_ENABLED } = require("../constants/constants");
test('Check if createChoices creates all elements correctly and deleteChoices removes them', () => {
    const playerDiv = document.createElement(DIV);
    playerDiv.id = PLAYER1;
    document.body.appendChild(playerDiv);
    IndexFunctions.createChoices(playerDiv, PLAYER1, CHOICE_DISABLED);
    expect(playerDiv.childElementCount).toEqual(3);
    expect(document.getElementById("player1-rock").className).toEqual(CHOICE_DISABLED);
    expect(document.getElementById("player1-paper").className).toEqual(CHOICE_DISABLED);
    expect(document.getElementById("player1-scissors").className).toEqual(CHOICE_DISABLED);

    IndexFunctions.deleteChoices(PLAYER1);
    expect(playerDiv.childElementCount).toEqual(0);
})

test('Check if winning and losing choices are reflected', () => {
    const player1Div = document.createElement(DIV);
    player1Div.id = PLAYER1;
    document.body.appendChild(player1Div);
    const player2Div = document.createElement(DIV);
    player2Div.id = PLAYER2;
    document.body.appendChild(player2Div);
    IndexFunctions.createChoices(player1Div, PLAYER1, CHOICE_DISABLED);
    expect(player1Div.childElementCount).toEqual(3);
    IndexFunctions.createChoices(player2Div, PLAYER2, CHOICE_DISABLED);
    expect(player2Div.childElementCount).toEqual(3);

    const resultMessage = document.createElement("p");
    resultMessage.id = "result-message";
    document.body.appendChild(document.createElement(DIV).appendChild(resultMessage));
    IndexFunctions.gameResult(PLAYER1, PLAYER2, ROCK, SCISSORS);
    expect(document.getElementById("player1-rock").className).toEqual(CHOICE_WINNER);
    expect(document.getElementById("player2-scissors").className).toEqual(CHOICE_LOSER);
    expect(document.getElementById("result-message").innerText).toEqual("player1 wins");
})

test('Check if states are changed with enable disable choices', () => {
    const playerDiv = document.createElement(DIV);
    playerDiv.id = "player1";
    document.body.appendChild(playerDiv);
    IndexFunctions.createChoices(playerDiv, PLAYER1, CHOICE_DISABLED);
    expect(playerDiv.childElementCount).toEqual(3);
    IndexFunctions.enableChoices(PLAYER1);
    expect(document.getElementById("player1-rock").className).toEqual(CHOICE_ENABLED);
    expect(document.getElementById("player1-paper").className).toEqual(CHOICE_ENABLED);
    expect(document.getElementById("player1-scissors").className).toEqual(CHOICE_ENABLED);
    IndexFunctions.disableChoices(PLAYER1);
    expect(document.getElementById("player1-rock").className).toEqual(CHOICE_DISABLED);
    expect(document.getElementById("player1-paper").className).toEqual(CHOICE_DISABLED);
    expect(document.getElementById("player1-scissors").className).toEqual(CHOICE_DISABLED);
})

test('Check if premium features are activated correctly', () => {
    const premiumSpan = document.createElement("span");
    premiumSpan.id = "premium";
    document.head.appendChild(premiumSpan);
    const playerDiv = document.createElement(DIV);
    playerDiv.id = PLAYER1;
    document.body.appendChild(playerDiv);
    // activates premium mode
    IndexFunctions.premiumMode();
    IndexFunctions.createChoices(playerDiv, PLAYER1, CHOICE_DISABLED);
    expect(document.getElementById("player1-spock").className).toEqual(CHOICE_DISABLED);
    expect(document.getElementById("player1-lizard").className).toEqual(CHOICE_DISABLED);
    expect(document.getElementById("premium").className).toEqual("clicked");

    // cleans div choices
    IndexFunctions.deleteChoices(PLAYER1);

    // deactivates premium
    IndexFunctions.premiumMode();
    IndexFunctions.createChoices(playerDiv, PLAYER1, CHOICE_DISABLED);
    expect(document.getElementById("player1-spock")).toEqual(null);
    expect(document.getElementById("player1-lizard")).toEqual(null);
    expect(document.getElementById("premium").className).toEqual("");
})