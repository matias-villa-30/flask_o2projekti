'use strict';

// Initialize variables
let player_position = 1;
let player2_position = 1;
let dice_roll_counter = 1; // Counts total rolls
let current_player = 1;    // Tracks the current player's turn (1 or 2)
let points_player1 = 0;
let points_player2 = 0;

// Roll Dice Functionality
function roll_dice() {


  const rolledNumber = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice_result").textContent = `Rolled Dice: ${rolledNumber}`;

  // Update the position based on the current player
  if (current_player === 1) {
    player_position = (player_position + rolledNumber) % 28;
    trigger_quiz(player_position, current_player);
    current_player = 2; // Switch to Player 2
  } else {
    player2_position = (player2_position + rolledNumber) % 28;
    trigger_quiz(player2_position, current_player);
    current_player = 1; // Switch to Player 1
  }

  // Increment the dice roll counter
  dice_roll_counter++;

  // Update the display for both players
  updatePlayerPositionDisplay();

  // Debugging
  console.log(`Rolled: ${rolledNumber}, Dice Counter: ${dice_roll_counter}`);
  console.log(`Player 1: ${player_position}, Player 2: ${player2_position}`);
}

// Trigger quizzes based on position
function trigger_quiz(position, player) {
  if ([2, 3, 5, 6, 7].includes(position)) {
    show_question1();
  } else if ([9, 10, 11, 13, 14].includes(position)) {
    kysymys2();
  } else if ([16, 17, 19, 20, 21].includes(position)) {
    kysymys3();
  } else if ([23, 24, 25, 27, 0].includes(position)) {
    kysymys4();
  } else if ([4, 8, 12, 15, 18, 22, 26].includes(position)) {
    // Trigger a random event
    console.log(`Random event triggered for Player ${player} at position ${position}`);
    randomEvent(player);
  }

  console.log(`Quiz or event triggered for Player ${player} at position ${position}`);

  // Check for a winner after every event or quiz
  checkForWinner();
}


function randomEvent(current_player) {

  const events = [
    () => { // Event 1: Player 1 gains 200 points
      points_player1 += 200;
      alert("Event: Player 1 gains 200 points!");
      console.log("Event: Player 1 gains 200 points!");
    },
    () => { // Event 2: Player 2 gains 200 points
      points_player2 += 200;
      alert("Event: Player 2 gains 200 points!");
      console.log("Event: Player 2 gains 200 points!");
    },
    () => { // Event 3: Player 1 points reset to 0
      points_player1 = 0;
      alert("Event: Player 1 points reset to 0!");
      console.log("Event: Player 1 points reset to 0!");
    },
    () => { // Event 4: Player 2 points reset to 0
      points_player2 = 0;
      alert("Event: Player 2 points reset to 0!");
      console.log("Event: Player 2 points reset to 0!");
    },
    () => { // Event 5: Player 1 gains 1000 points and wins
      points_player1 = 1000;
      console.log("Event: Player 1 wins the game with 1000 points!");
      alert("Event: Player 1 wins the game with 1000 points!");
      declareWinner(1);
    },
    () => { // Event 6: Player 2 gains 1000 points and wins
      points_player2 = 1000;
      alert("Event: Player 2 wins the game with 1000 points!");
      console.log("Event: Player 2 wins the game with 1000 points!");
      declareWinner(2);
    }
  ];

  // Select and execute a random event
  const randomIndex = Math.floor(Math.random() * events.length);
  events[randomIndex]();

  // display scores
  const show_points = document.getElementById('map-points');
    show_points.innerHTML = `<p>Player 1: ${points_player1} points</p>
        <p>Player 2: ${points_player2} points</p>
        <p>Current turn: Player ${current_player}</p>`;
  // Display updated scores
  console.log(`Player 1 Points: ${points_player1}`);
  console.log(`Player 2 Points: ${points_player2}`);
}
function declareWinner(player) {
  alert(`Player ${player} wins the game!`);
  console.log(`Player ${player} has won the game!`);

  // Reset game or trigger additional end-game logic here
  resetGame();
}

function resetGame() {
  // Example reset logic
  points_player1 = 0;
  points_player2 = 0;
  console.log("Game has been reset. Ready for a new round.");
  // Add more logic as needed to restart or redirect to a new state
}
function checkForWinner() {
  if (points_player1 >= 1000) {
    console.log("Player 1 has reached 1000 points and wins the game!");
    declareWinner(1);
  } else if (points_player2 >= 1000) {
    console.log("Player 2 has reached 1000 points and wins the game!");
    declareWinner(2);
  }
}

// Update Player Position Display
function updatePlayerPositionDisplay() {
  const board_square1 = document.getElementById(`square${player_position}`);
  const board_square2 = document.getElementById(`square${player2_position}`);
  const locate_player = document.getElementById('position-player');

  locate_player.innerHTML = `
    ${board_square1 ? `<p>Position Player 1: ${board_square1.id}</p>` : ''}
    ${board_square2 ? `<p>Position Player 2: ${board_square2.id}</p>` : ''}
  `;
}

// Fetch Country Data
async function fetchCountriesData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return Object.values(await response.json());
}

async function show_question1() {
  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");
  const send_answer = document.getElementById("answer-button"); // Button to submit the answer
  const roll_dice = document.getElementById("roll_dice");
  const show_points = document.getElementById('map-points');

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container || !send_answer) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys', 'opciones', and 'answer-button' exist.");
    return;
  }

  // Disable roll_dice during the question
  roll_dice.disabled = true;

  // Clear previous content
  results.innerHTML = "";
  check_box_container.innerHTML = "";

  // Fetch countries data
  const countriesData = await fetchCountriesData();
  const validCountries = countriesData.filter(
    (country) => country.population && country.flags
  );

  // Choose a correct country
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

  // Create radio buttons for all options
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.value = option; // Use the option as value
    radio.name = "country"; // Ensure unique name for the radio group
    radio.id = `radio-${index}`; // Unique ID for each option

    label.prepend(radio);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Event listener for the answer button
  send_answer.onclick = () => {
    // Get the selected option
    const selectedOption = document.querySelector('input[name="country"]:checked');
    if (!selectedOption) {
      alert("Please select an answer.");
      return;
    }

    const selectedValue = selectedOption.value;
    let pointsToAdd = 50; // Points to add for a correct answer

    // Check if the selected answer is correct
    if (selectedValue === correctName) {
      alert("Correct answer!");
      if (current_player === 1) {
        points_player2 += pointsToAdd;


      } else {
        points_player1 += pointsToAdd;
      }
    } else {
      alert("Wrong answer!");
    }

    // Display updated scores
    console.log(`Player 1 Points: ${points_player1}`);
    console.log(`Player 2 Points: ${points_player2}`);
    show_points.innerHTML = `<p>Player 1: ${points_player1} points</p>
        <p>Player 2: ${points_player2} points</p>
        <p>Current turn: Player ${current_player}</p>`;
    // Enable roll dice and prepare for the next turn
    roll_dice.disabled = false;
  };
}



// Show Question 2
async function kysymys2() {
  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");
  const send_answer = document.getElementById('answer-button'); // Button to submit the answer
  const roll_dice = document.getElementById('roll_dice');

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container || !send_answer) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys', 'opciones', and 'answer-button' exist.");
    return;
  }
  // disable roll_dice button while answering question
  roll_dice.disabled = true;
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

  // Create radio buttons for all options
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option;

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = option; // Use the option as value
    checkbox.name = "capital"; // Ensure unique name for the radio group
    checkbox.id = `radio-${index}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Event listener for the answer button
  send_answer.onclick = () => {
    // Get the selected option
    const selectedOption = document.querySelector('input[name="capital"]:checked');
    if (!selectedOption) {
      alert("Please select an answer.");
      return;
    }

    const selectedValue = selectedOption.value;
    let pointsToAdd = 100; // Points to add for a correct answer


    // Check if the selected answer is correct
    if (selectedValue === correctCapital) {
      alert("Correct answer!");
      if (dice_roll_counter % 2 === 0) {
        points_player2 += pointsToAdd;
      } else {
        points_player1 += pointsToAdd;
      }
    } else {
      alert("Wrong answer!");

    }

    // Display updated scores
    console.log(`Player 1 Points: ${points_player1}`);
    console.log(`Player 2 Points: ${points_player2}`);
    const show_points = document.getElementById('map-points');
    show_points.innerHTML = `<p>Player 1: ${points_player1} points</p>
        <p>Player 2: ${points_player2} points</p>
        <p>Current turn: Player ${current_player}</p>`;

    // Advance to the next question or logic
    roll_dice.disabled = false;
    dice_roll_counter++;
  };
}


// Show Question 3
async function kysymys3(event) {
  if (event) {
    event.preventDefault(); // Prevent default form behavior
  }

  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");
  const send_answer = document.getElementById('answer-button'); // Button to submit the answer
  const roll_dice = document.getElementById('roll_dice');

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container || !send_answer) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys', 'opciones', and 'answer-button' exist.");
    return;
  }
  //
  roll_dice.disabled = true;
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

  // Create radio buttons for all options
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option.toLocaleString(); // Format population as a string with commas

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = option; // Use the option value (population number)
    checkbox.name = "population"; // Ensure unique name for the radio group
    checkbox.id = `radio-${index}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Event listener for the answer button
  send_answer.onclick = () => {
    // Get the selected option
    const selectedOption = document.querySelector('input[name="population"]:checked');
    if (!selectedOption) {
      alert("Please select an answer.");
      return;
    }

    const selectedValue = parseInt(selectedOption.value, 10); // Parse the selected value as a number
    let pointsToAdd = 150; // Points to add for a correct answer


    // Check if the selected answer is correct
    if (selectedValue === correctPopulation) {
      alert("Correct answer!");
      if (dice_roll_counter % 2 === 0) {
        points_player2 += pointsToAdd;
      } else {
        points_player1 += pointsToAdd;
      }
    } else {
      alert("Wrong answer!");

    }

    // Display updated scores
    console.log(`Player 1 Points: ${points_player1}`);
    console.log(`Player 2 Points: ${points_player2}`);
    const show_points = document.getElementById('map-points');
    show_points.innerHTML = `<p>Player 1: ${points_player1} points</p>
        <p>Player 2: ${points_player2} points</p>
        <p>Current turn: Player ${current_player}</p>`;
    // Advance to the next question or logic
    roll_dice.disabled = false;
    dice_roll_counter++;
  };
}


// Show Question 4
async function kysymys4(event) {
  if (event) {
    event.preventDefault(); // Prevent default form behavior
  }

  const titulo = document.getElementById("titulo");
  const results = document.getElementById("kysymys");
  const check_box_container = document.getElementById("opciones");
  const send_answer = document.getElementById('answer-button'); // Button to submit the answer
  const roll_dice = document.getElementById('roll_dice');

  // Ensure the `results` and `check_box_container` elements exist
  if (!results || !check_box_container || !send_answer) {
    console.error("Missing required elements in the DOM. Ensure 'kysymys', 'opciones', and 'answer-button' exist.");
    return;
  }
  // disable roll button while answering questions
  roll_dice.disabled = true;

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

  // Create radio buttons for all options
  allOptions.forEach((option, index) => {
    const label = document.createElement("label");
    label.textContent = option.join(", "); // Combine timezones into a string

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = option.join(", "); // Use the timezones as the value
    checkbox.name = "timezones"; // Ensure unique name for the radio group
    checkbox.id = `radio-${index}`; // Unique ID for each option

    label.prepend(checkbox);
    check_box_container.appendChild(label);
    check_box_container.appendChild(document.createElement("br"));
  });

  // Event listener for the answer button
  send_answer.onclick = () => {
    // Get the selected option
    const selectedOption = document.querySelector('input[name="timezones"]:checked');
    if (!selectedOption) {
      alert("Please select an answer.");
      return;
    }

    const selectedValue = selectedOption.value.split(", "); // Split the selected value back into an array
    let pointsToAdd = 75; // Points to add for a correct answer


    // Check if the selected answer is correct
    const isCorrect = selectedValue.every((timezone) => correctTimezones.includes(timezone));
    if (isCorrect) {
      alert("Correct answer!");
      if (dice_roll_counter % 2 === 0) {
        points_player2 += pointsToAdd;
      } else {
        points_player1 += pointsToAdd;
      }
    } else {
      alert("Wrong answer!");

    }

    // Display updated scores
    console.log(`Player 1 Points: ${points_player1}`);
    console.log(`Player 2 Points: ${points_player2}`);

    const show_points = document.getElementById('map-points');
    show_points.innerHTML = `<p>Player 1: ${points_player1} points</p>
        <p>Player 2: ${points_player2} points</p>
        <p>Current turn: Player ${current_player}</p>`;
    // Advance to the next question or logic
    roll_dice.disabled = false;
    dice_roll_counter++;
  };
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