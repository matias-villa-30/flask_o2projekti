'use strict';

let player_position = 1;

// Roll Dice Functionality
function roll_dice() {
  const rolledNumber = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice_result").textContent = `Rolled Dice: ${rolledNumber}`;

  // Update player position and wrap around if exceeding 28
  player_position = (player_position + rolledNumber) % 28;

  updatePlayerPositionDisplay();

  // Trigger quizzes based on the player position
  if ([2, 3, 5, 6, 7].includes(player_position)) {
    show_question1();
  } else if ([9, 10, 11, 13, 14].includes(player_position)) {
    kysymys2();
  } else if ([16, 17, 19, 20, 21].includes(player_position)) {
    kysymys3();
  }
}

// Update Player Position Display
function updatePlayerPositionDisplay() {
  const board_square = document.getElementById(`square${player_position}`);
  const locate_player = document.getElementById('position-player');

  if (board_square) {
    locate_player.innerHTML = `<p>Position Player 1: ${board_square.id}</p>`;
  }
}

// Fetch Country Data
async function fetchCountriesData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return Object.values(await response.json());
}

// Setup Quiz
function setupQuiz(countriesData) {
  const correctCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
  const correctFlag = correctCountry.flags?.png;
  const correctFlagName = correctCountry.name.common;

  displayFlag(correctFlag);
  const wrongCountries = generateWrongAnswers(countriesData, correctFlagName);
  const allOptions = shuffleOptions([...wrongCountries, correctFlagName]);

  setupOptions(allOptions, correctFlagName);
}

// Display Flag
function displayFlag(flagUrl) {
  const results = document.getElementById("kysymys");
  results.innerHTML = `<img src="${flagUrl || ''}" alt="Country Flag"><h2>Guess the flag!</h2>`;
}

// Generate Wrong Answers
function generateWrongAnswers(countriesData, correctName) {
  const wrongCountries = [];
  while (wrongCountries.length < 3) {
    const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)].name.common;
    if (randomCountry !== correctName && !wrongCountries.includes(randomCountry)) {
      wrongCountries.push(randomCountry);
    }
  }
  return wrongCountries;
}

// Shuffle Options
function shuffleOptions(options) {
  return options.sort(() => Math.random() - 0.5);
}

// Setup Options
function setupOptions(options, correctName) {
  const checkBoxContainer = document.getElementById("opciones");
  checkBoxContainer.innerHTML = "";

  options.forEach((countryName) => {
    const label = document.createElement("label");
    label.textContent = countryName;

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = countryName;
    checkbox.name = "countries";

    label.prepend(checkbox);
    checkBoxContainer.appendChild(label);
    checkBoxContainer.appendChild(document.createElement("br"));
  });

  document.getElementById("submit_vastaus").innerHTML = `
    <form id="next">
      <button type="submit">Check answer</button>
    </form>
  `;
}

// Show Question 1
async function show_question1() {
  const countriesData = await fetchCountriesData();
  setupQuiz(countriesData);
}

// Show Question 2
async function kysymys2() {
  const countriesData = await fetchCountriesData();
  const validCountries = countriesData.filter(
    (country) => country.capital && country.capital.length > 0 && country.flags
  );

  const correctCountry = validCountries[Math.floor(Math.random() * validCountries.length)];
  const correctCapital = correctCountry.capital[0];
  const correctFlag = correctCountry.flags.png;

  const results = document.getElementById("kysymys");
  results.innerHTML = `<img src="${correctFlag}" alt="Country Flag">`;
  document.getElementById("titulo").textContent = `What is the capital of ${correctCountry.name.common}?`;

  const wrongCapitals = [];
  while (wrongCapitals.length < 3) {
    const randomCapital = validCountries[Math.floor(Math.random() * validCountries.length)].capital[0];
    if (randomCapital !== correctCapital && !wrongCapitals.includes(randomCapital)) {
      wrongCapitals.push(randomCapital);
    }
  }

  const allOptions = shuffleOptions([...wrongCapitals, correctCapital]);
  setupOptions(allOptions, correctCapital);
}

// Show Question 5
async function kysymys3(event) {
  if (event) {
    event.preventDefault(); // Prevent default form behavior
  }

  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys"); // Match `kysymys2`
  const check_box_container = document.getElementById("opciones"); // Match `kysymys2`

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys' and 'opciones' exist.");
    return;
  }

  // Clear previous content
  results.innerHTML = "";
  check_box_container.innerHTML = "";

  const response = await fetch("https://restcountries.com/v3.1/all");
  const json_country = await response.json();

  const validCountries = json_country.filter(
    (country) => country.population && country.flags
  );

  const correctCountry = validCountries[Math.floor(Math.random() * validCountries.length)];
  const correctPopulation = correctCountry.population;
  const correctFlag = correctCountry.flags.png;
  const correctName = correctCountry.name.common;

  // Update question title
  titulo.innerHTML = `Guess the population of ${correctName}`;

  // Display the correct country's flag
  const img = document.createElement("img");
  img.src = correctFlag;
  img.alt = `${correctName} flag`;
  results.appendChild(img);

  // Generate 3 wrong options
  const wrongPopulations = [];
  while (wrongPopulations.length < 3) {
    const randomIndex = Math.floor(Math.random() * validCountries.length);
    const wrongPopulation = validCountries[randomIndex].population;
    if (wrongPopulation !== correctPopulation && !wrongPopulations.includes(wrongPopulation)) {
      wrongPopulations.push(wrongPopulation);
    }
  }

  // Combine correct and wrong answers, then shuffle
  const allOptions = shuffleOptions([...wrongPopulations, correctPopulation]);

  // Create checkboxes for all options
  allOptions.forEach((option) => {
    const label = document.createElement("label");
    label.textContent = option.toLocaleString();

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = option;
    checkbox.name = "population"; // Ensure unique name for the radio group
    checkbox.id = `radio-${option}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Add a submit button for the next step
  const submitPlace = document.getElementById("submit_vastaus"); // Match `kysymys2`
  submitPlace.innerHTML = `
    <form id="next">
      <button type="submit">Next</button>
    </form>
  `;
}


// Initialize Roll Dice Button Event
document.getElementById("roll_dice").addEventListener("click", roll_dice);
