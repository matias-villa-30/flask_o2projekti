'use strict';

const main = document.querySelector('main');
const topBottomCells = 8;
const leftRightCells = 8;

function generateCells() {
    main.innerHTML = '';

    const mainWidth = main.clientWidth;
    const mainHeight = main.clientHeight;

    const cellWidth = mainWidth / topBottomCells;

    const cellHeight = mainHeight / leftRightCells;

    let cellCounter = 1;

    const firstCell = document.createElement('div');
    firstCell.className = 'cell';
    firstCell.style.width = `${cellWidth}px`;
    firstCell.style.height = `${cellHeight}px`;
    firstCell.style.top = `${mainHeight - cellHeight}px`;
    firstCell.style.left = `${mainWidth - cellWidth}px`;
    firstCell.textContent = `Ruutu ${cellCounter}`;
    main.appendChild(firstCell);
    cellCounter++;

    const noPointsCells = [1, 4, 8, 12, 15, 18, 22, 26]; // Cells without points

// Bottom row (50 points)
for (let i = 1; i < topBottomCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `square${cellCounter}`;
    cell.style.width = `${cellWidth}px`;
    cell.style.height = `${cellHeight}px`;
    cell.style.top = `${mainHeight - cellHeight}px`;
    cell.style.left = `${(mainWidth - cellWidth) - i * (mainWidth - cellWidth) / (topBottomCells - 1)}px`;

    if (noPointsCells.includes(cellCounter)) {
        cell.textContent = `Ruutu ${cellCounter}`;
    } else {
        cell.textContent = `Ruutu ${cellCounter} - 50 points`;
    }

    main.appendChild(cell);
    cellCounter++;
}

// Left column (100 points)
for (let i = 1; i < leftRightCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `square${cellCounter}`;
    cell.style.width = `${cellWidth}px`;
    cell.style.height = `${cellHeight}px`;
    cell.style.top = `${(mainHeight - cellHeight) - i * (mainHeight - cellHeight) / (leftRightCells - 1)}px`;
    cell.style.left = 0;

    if (noPointsCells.includes(cellCounter)) {
        cell.textContent = `Ruutu ${cellCounter}`;
    } else {
        cell.textContent = `Ruutu ${cellCounter} - 100 points`;
    }

    main.appendChild(cell);
    cellCounter++;
}

// Top row (150 points)
for (let i = 1; i < topBottomCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `square${cellCounter}`;
    cell.style.width = `${cellWidth}px`;
    cell.style.height = `${cellHeight}px`;
    cell.style.top = 0;
    cell.style.left = `${i * (mainWidth - cellWidth) / (topBottomCells - 1)}px`;

    if (noPointsCells.includes(cellCounter)) {
        cell.textContent = `Ruutu ${cellCounter}`;
    } else {
        cell.textContent = `Ruutu ${cellCounter} - 150 points`;
    }

    main.appendChild(cell);
    cellCounter++;
}

// Right column (75 points)
for (let i = 1; i < leftRightCells - 1; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `square${cellCounter}`;
    cell.style.width = `${cellWidth}px`;
    cell.style.height = `${cellHeight}px`;
    cell.style.top = `${i * (mainHeight - cellHeight) / (leftRightCells - 1)}px`;
    cell.style.left = `${mainWidth - cellWidth}px`;

    if (noPointsCells.includes(cellCounter)) {
        cell.textContent = `Ruutu ${cellCounter}`;
    } else {
        cell.textContent = `Ruutu ${cellCounter} - 75 points`;
    }

    main.appendChild(cell);
    cellCounter++;
}


    const centralContainer = document.createElement('div');
    centralContainer.className = 'central-container';
    main.appendChild(centralContainer);

    // Left part of the board

    const leftPart = document.createElement('div');
    leftPart.className = 'left-part';
    centralContainer.appendChild(leftPart);

    const questionPart = document.createElement('div');
    questionPart.className = 'questions';
    questionPart.id = 'kysymys';
    leftPart.appendChild(questionPart);


    // title below the flag

    const otsikko = document.createElement('h1');
    otsikko.className = 'questions';
    otsikko.id = 'titulo';
    leftPart.appendChild(otsikko);

    // container for the answers

    const answersPart = document.createElement('div');
    answersPart.className = 'questions';
    answersPart.id = 'opciones';
    leftPart.appendChild(answersPart);


    // Game buttons div
    const gameButtons = document.createElement('div');
    gameButtons.className = 'game-buttons';
    leftPart.appendChild(gameButtons);

    // game containter buttons
    const pass_button = document.createElement('button');
    pass_button.className = 'button';
    pass_button.id = 'pass-button'
    pass_button.textContent = 'Pass';
    pass_button.disabled = true;

    const answer_button = document.createElement('button');
    answer_button.className = 'button';
    answer_button.id = 'answer-button';
    answer_button.textContent = 'Submit Answer';
    answer_button.disabled = true;

    const nappi_button = document.createElement('button');
    nappi_button.className = 'button';
    nappi_button.id = "roll_dice";
    nappi_button.textContent = "Roll dice";
    nappi_button.disabled = true;

    gameButtons.appendChild(pass_button);
    gameButtons.appendChild(answer_button);
    gameButtons.appendChild(nappi_button);


    const rightPart = document.createElement('div');
    rightPart.className = 'right-part';
    centralContainer.appendChild(rightPart);

    // right buttons container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttons';
    rightPart.appendChild(buttonContainer);

    const startBut = document.createElement('button');
    startBut.className = 'button';
    startBut.textContent = "Start";
    startBut.id = "start_button";

    const rulesBut = document.createElement('button');
    rulesBut.className = 'button';
    rulesBut.id = 'rules_button';
    rulesBut.textContent = "Rules";

    const exitBut = document.createElement('button');
    exitBut.className = 'button';
    exitBut.id = "quit_button";
    exitBut.textContent = "Quit";


    buttonContainer.appendChild(startBut);
    buttonContainer.appendChild(rulesBut);
    buttonContainer.appendChild(exitBut);


    const gameStats = document.createElement('div');
    gameStats.className = 'stats';
    gameStats.id = 'estadisticas';
    rightPart.appendChild(gameStats);

    // locate current turn and player points on the screen

    const gameMap = document.createElement('div');
    gameMap.className = 'map';
    gameMap.id = 'map-points';
    gameStats.appendChild(gameMap);

    const playerStats = document.createElement('div');
    playerStats.className = 'players';
    playerStats.id = "field_players";
    gameStats.appendChild(playerStats);

    // Create the dice result container
    const diceResult = document.createElement('div');
    diceResult.id = "dice_result";
    diceResult.style.marginTop = "10px"; // Optional styling for spacing
    diceResult.style.fontSize = "18px";
    diceResult.style.fontWeight = "bold";
    diceResult.style.color = "black";
    diceResult.style.textAlign = "center";
    diceResult.style.background = "darkgreen";

    // Append dice result below field_players
    gameStats.appendChild(diceResult); // Ensure it's added after playerStats

    // Player position container
    const playerPos = document.createElement('div');
    playerPos.id = "position-player";
    playerPos.style.marginTop = "10px"; // Optional styling for spacing
    playerPos.style.fontSize = "18px";
    playerPos.style.fontWeight = "bold";
    playerPos.style.color = "black";
    playerPos.style.textAlign = "center";
    playerPos.style.background = "darkgreen";

    gameStats.appendChild(playerPos);


}

generateCells();

