'use strict';

let player_position = 1;
let player2_position = 1;
let dice_roll_counter = 0;

// Roll Dice Functionality
function roll_dice() {
  const rolledNumber = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice_result").textContent = `Rolled Dice: ${rolledNumber}`;

  // Increment the dice roll counter
  dice_roll_counter++;

  // Determine which player's turn it is based on the counter
  if (dice_roll_counter % 2 !== 0) {
    // Player 1's turn
    player_position = (player_position + rolledNumber) % 28;
  } else {
    // Player 2's turn
    player2_position = (player2_position + rolledNumber) % 28;
  }

  updatePlayerPositionDisplay();

  // Trigger quizzes based on the player position
  if ([2, 3, 5, 6, 7].includes(player_position) && dice_roll_counter % 2 !== 0) {
    show_question1();
  } else if ([9, 10, 11, 13, 14].includes(player_position) && dice_roll_counter % 2 !== 0) {
    kysymys2();
  } else if ([16, 17, 19, 20, 21].includes(player_position) && dice_roll_counter % 2 !== 0) {
    kysymys3();
  } else if ([23, 24, 25, 27, 28].includes(player_position) && dice_roll_counter % 2 !== 0) {
    kysymys4();
  }

  if ([2, 3, 5, 6, 7].includes(player2_position) && dice_roll_counter % 2 === 0) {
    show_question1();
  } else if ([9, 10, 11, 13, 14].includes(player2_position) && dice_roll_counter % 2 === 0) {
    kysymys2();
  } else if ([16, 17, 19, 20, 21].includes(player2_position) && dice_roll_counter % 2 === 0) {
    kysymys3();
  } else if ([23, 24, 25, 27, 28].includes(player2_position) && dice_roll_counter % 2 === 0) {
    kysymys4();
  }
}

// Update Player Position Display
function updatePlayerPositionDisplay() {
  const board_square1 = document.getElementById(`square${player_position}`);
  const board_square2 = document.getElementById(`square${player2_position}`);
  const locate_player = document.getElementById('position-player');

  if (board_square1) {
    locate_player.innerHTML = `<p>Position Player 1: ${board_square1.id}</p>`;
  }
  if (board_square2) {
    locate_player.innerHTML += `<p>Position Player 2: ${board_square2.id}</p>`;
  }
}

// Fetch Country Data
async function fetchCountriesData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return Object.values(await response.json());
}

// Show Question 1
async function show_question1() {
  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys' and 'opciones' exist.");
    return;
  }

  // Clear previous content
  results.innerHTML = "";
  check_box_container.innerHTML = "";

  const countriesData = await fetchCountriesData();
  const validCountries = countriesData.filter(
    (country) => country.population && country.flags
  );

  const correctCountry = validCountries[Math.floor(Math.random() * validCountries.length)];
  const correctFlag = correctCountry.flags.png;
  const correctName = correctCountry.name.common;

  // Update question title
  titulo.innerHTML = `Guess the country by its flag`;

  // Display the correct country's flag
  const img = document.createElement("img");
  img.src = correctFlag;
  img.alt = `${correctName} flag`;
  results.appendChild(img);

  // Generate 3 wrong options
  const wrongCountries = [];
  while (wrongCountries.length < 3) {
    const randomCountry = validCountries[Math.floor(Math.random() * validCountries.length)].name.common;
    if (randomCountry !== correctName && !wrongCountries.includes(randomCountry)) {
      wrongCountries.push(randomCountry);
    }
  }

  // Combine correct and wrong answers, then shuffle
  const allOptions = shuffleOptions([...wrongCountries, correctName]);

  // Create checkboxes for all options
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option;

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = index;
    checkbox.name = "country"; // Ensure unique name for the radio group
    checkbox.id = `radio-${index}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Add a submit button for the next step
  const submitPlace = document.getElementById("submit_vastaus");
  submitPlace.innerHTML = `
    <form id="next">
      <button type="submit">Next</button>
    </form>
  `;
}

// Show Question 2
async function kysymys2() {
  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys' and 'opciones' exist.");
    return;
  }

  // Clear previous content
  results.innerHTML = "";
  check_box_container.innerHTML = "";

  const countriesData = await fetchCountriesData();
  const validCountries = countriesData.filter(
    (country) => country.capital && country.capital.length > 0 && country.flags
  );

  const correctCountry = validCountries[Math.floor(Math.random() * validCountries.length)];
  const correctCapital = correctCountry.capital[0];
  const correctFlag = correctCountry.flags.png;

  // Update question title
  titulo.innerHTML = `What is the capital of ${correctCountry.name.common}?`;

  // Display the correct country's flag
  const img = document.createElement("img");
  img.src = correctFlag;
  img.alt = `${correctCountry.name.common} flag`;
  results.appendChild(img);

  // Generate 3 wrong options
  const wrongCapitals = [];
  while (wrongCapitals.length < 3) {
    const randomCapital = validCountries[Math.floor(Math.random() * validCountries.length)].capital[0];
    if (randomCapital !== correctCapital && !wrongCapitals.includes(randomCapital)) {
      wrongCapitals.push(randomCapital);
    }
  }

  // Combine correct and wrong answers, then shuffle
  const allOptions = shuffleOptions([...wrongCapitals, correctCapital]);

  // Create checkboxes for all options
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option;

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = index;
    checkbox.name = "capital"; // Ensure unique name for the radio group
    checkbox.id = `radio-${index}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Add a submit button for the next step
  const submitPlace = document.getElementById("submit_vastaus");
  submitPlace.innerHTML = `
    <form id="next">
      <button type="submit">Next</button>
    </form>
  `;
}

// Show Question 3
async function kysymys3(event) {
  if (event) {
    event.preventDefault(); // Prevent default form behavior
  }

  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys' and 'opciones' exist.");
    return;
  }

  // Clear previous content
  results.innerHTML = "";
  check_box_container.innerHTML = "";

  const countriesData = await fetchCountriesData();
  const validCountries = countriesData.filter(
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
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option.toLocaleString();

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = index;
    checkbox.name = "population"; // Ensure unique name for the radio group
    checkbox.id = `radio-${index}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Add a submit button for the next step
  const submitPlace = document.getElementById("submit_vastaus");
  submitPlace.innerHTML = `
    <form id="next">
      <button type="submit">Next</button>
    </form>
  `;
}

// Show Question 4
async function kysymys4(event) {
  if (event) {
    event.preventDefault(); // Prevent default form behavior
  }

  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys' and 'opciones' exist.");
    return;
  }

  // Clear previous content
  results.innerHTML = "";
  check_box_container.innerHTML = "";

  const countriesData = await fetchCountriesData();
  const validCountries = countriesData.filter(
    (country) => country.population && country.timezones && country.timezones.length > 0
  );

  const correctCountry = validCountries[Math.floor(Math.random() * validCountries.length)];
  const correctPopulation = correctCountry.population;
  const correctName = correctCountry.name.common;
  const correctTimezones = correctCountry.timezones;

  // Update question title
  titulo.innerHTML = `Guess the timezones of ${correctName}`;

  // Display the correct country's population only on the first question
  if (player_position === 1) {
    const populationInfo = document.createElement("p");
    populationInfo.textContent = `Population: ${correctPopulation.toLocaleString()}`;
    results.appendChild(populationInfo);
  }

  // Generate 3 wrong options
  const wrongTimezones = [];
  while (wrongTimezones.length < 3) {
    const randomIndex = Math.floor(Math.random() * validCountries.length);
    const wrongCountry = validCountries[randomIndex];
    const wrongTimezone = wrongCountry.timezones;
    if (wrongCountry.name.common !== correctName && !wrongTimezones.includes(wrongTimezone)) {
      wrongTimezones.push(wrongTimezone);
    }
  }

  // Combine correct and wrong answers, then shuffle
  const allOptions = shuffleOptions([...wrongTimezones, correctTimezones]);

  // Create checkboxes for all options
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option.join(", ");

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = index;
    checkbox.name = "timezones"; // Ensure unique name for the radio group
    checkbox.id = `radio-${index}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Add a submit button for the next step
  const submitPlace = document.getElementById("submit_vastaus");
  submitPlace.innerHTML = `
    <form id="next">
      <button type="submit">Next</button>
    </form>
  `;
}

// Helper function to shuffle an array
function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

// Initialize Roll Dice Button Event
document.getElementById("roll_dice").addEventListener("click", roll_dice);
