'use strict';

/*Handle functionality of buttons  */

const rules_button = document.getElementById('rules_button');
rules_button.onclick = () => {
    alert("Game starts after selecting the name of the players. Player move around the board throwing a dice, each square will be a different country, then the players will answer questions about that country, that will win or lose them points. Game finishes when the first player reaches 1000 points. Huom! There are also squares that will surprise the player.");
};

const quit_button = document.getElementById('quit_button');
quit_button.onclick = () => {
    const confirmation = confirm("Are you sure you want to quit the game?");
    if (confirmation) {
        // Clear the screen content and provide the back-to-home button
        document.body.innerHTML = `
            <h1>Thank you for playing!</h1>
            <button id="main-page-button">Go to Main Page</button>
        `;

        // Add functionality to redirect to Flask's home route
        const mainPageButton = document.getElementById('main-page-button');
        mainPageButton.onclick = () => {
            window.location.href = "/"; // Flask's home route
        };
    }
};




function player_name() {
  // Create the form HTML
  const PlayerForms = `
    <form id="query">
        <input type="text" id="nombre-player1" placeholder="Player 1" required>
        <input type="text" id="nombre-player2" placeholder="Player 2" required>
        <button type="submit">Submit Names</button>
    </form>
  `;

  // Insert the forms into the container
  const container = document.getElementById('field_players');
  container.innerHTML = PlayerForms;

  // Add event listener to the form
  const form = document.getElementById("query");
  form.addEventListener("submit", gameOn);
}

async function gameOn(event) {
  event.preventDefault(); // Prevent form submission

  const player1 = document.getElementById("nombre-player1").value;
  const player2 = document.getElementById("nombre-player2").value;

  // Hide the container with the form
  const container = document.getElementById("field_players");
  container.style.display = "none";

  // Display player names in the stats box

  container.innerHTML = `
    <p>Player 1: ${player1}</p>
    <p>Player 2: ${player2}</p>
  `;
  const reminder = alert("Click roll dice to begin");

  // disable start button
  const start_button = document.getElementById('start_button');
  start_button.disabled = true;

  //Enable game buttons
  const dado = document.getElementById("roll_dice");
  dado.disabled = false;

  const pass = document.getElementById('pass-button');
  pass.disabled = false;

  const send_answer = document.getElementById('answer-button');
  send_answer.disabled = false;

}


// Add event listener to the start button
const start_game = document.getElementById("start_button");
start_game.addEventListener("click", player_name);




