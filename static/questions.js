'use strict';

// Initialize player position
let player_position = 1;

// Nappi button to start the game
function roll_dice() {
  // Generate a random number between 1 and 6
  let rolledNumber = Math.floor(Math.random() * 6) + 1;

  // Update dice result
  const diceResult = document.getElementById("dice_result");
  diceResult.textContent = `Rolled Dice: ${rolledNumber}`;

  // Update player position
  player_position += rolledNumber;

  // Select the element where the player is positioned
  const board_square = document.getElementById(`square${player_position}`);
  const locate_player = document.getElementById('position-player');

  if (board_square) {
    locate_player.innerHTML = `
      <p>Position Player 1: ${board_square.id}</p>
    `;
  } else {
    console.error('Player moved out of bounds.');
    locate_player.innerHTML = `<p>Player is out of bounds!</p>`;
  }

  // Check if the player is on a position to trigger a quiz
  if ([2, 3, 4, 5, 6, 7].includes(player_position)) {
    show_question1();
  }
}

// Function to fetch country data
async function fetchCountriesData() {
  const countryApi = await fetch("https://restcountries.com/v3.1/all");
  const jsonCountry = await countryApi.json();
  return Object.values(jsonCountry); // Return as an array of country objects
}

// Function to set up the quiz
function setupQuiz(countriesData) {
  const randomIndex = Math.floor(Math.random() * countriesData.length);
  const correctCountry = countriesData[randomIndex];
  const correctFlag = correctCountry.flags?.png;
  const correctFlagName = correctCountry.name.common;

  // Display the flag
  displayFlag(correctFlag);

  // Generate options and set up checkboxes
  const wrongCountries = generateWrongAnswers(countriesData, correctFlagName);
  const allOptions = shuffleOptions([...wrongCountries, correctFlagName]);

  setupOptions(allOptions, correctFlagName);
}

// Function to display the correct flag
function displayFlag(flagUrl) {
  const results = document.getElementById("kysymys");
  results.innerHTML = ""; // Clear previous flag
  const img = document.createElement('img');
  img.src = flagUrl || ''; // Handle missing flags
  results.appendChild(img);
  const titulo = document.getElementById('titulo');
  titulo.innerHTML = "Guess the flag!";
  results.appendChild(titulo);
  const confirm_button = document.createElement('button');

}

// Function to generate 3 wrong answers
function generateWrongAnswers(countriesData, correctName) {
  const wrongCountries = [];
  while (wrongCountries.length < 3) {
    const randomIndex = Math.floor(Math.random() * countriesData.length);
    const wrongCountryName = countriesData[randomIndex].name.common;

    if (wrongCountryName !== correctName && !wrongCountries.includes(wrongCountryName)) {
      wrongCountries.push(wrongCountryName);
    }
  }
  return wrongCountries;
}

// Function to shuffle options
function shuffleOptions(options) {
  return options.sort(() => Math.random() - 0.5);
}

// Function to create and display options as checkboxes
function setupOptions(options, correctName) {
  const checkBoxContainer = document.getElementById("opciones");
  checkBoxContainer.innerHTML = ""; // Clear previous options

  options.forEach((countryName) => {
    const label = document.createElement("label");
    label.textContent = countryName;

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = countryName;
    checkbox.name = "countries";
    checkbox.id = `radio-${countryName.toLowerCase().replace(/\s+/g, "-")}`;

    label.prepend(checkbox);
    checkBoxContainer.appendChild(label);
    checkBoxContainer.appendChild(document.createElement("br"));
  });
}

// Define the function to trigger the quiz setup
async function show_question1() {
  const countriesData = await fetchCountriesData();
  setupQuiz(countriesData);
}

// Add event listener to roll dice button
const nappi = document.getElementById("roll_dice");
nappi.addEventListener("click", roll_dice);

