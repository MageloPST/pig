/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

//
var scores, round, current;
var dice = document.getElementById('dice');
// Initializing game
init();

// Event listener for rolling dice
document.getElementById('btn-roll').addEventListener('click', function () {
    // Random value for dice
    let _dice = random();
    // Setting in UI
    dice.style.display = 'block';
    dice.src = 'resources/dice-' + _dice + '.png';
    // Checking game condition !== 1
    if (_dice === 1) {
        // Switching player
        switchPlayer();
    } else {
        // Updating current round score
        round += _dice;
    }
    // Current round score defined
    document.getElementById('current-' + current).textContent = round;

});

// Event listener for holding score
document.getElementById('btn-hold').addEventListener('click', function () {
    // Adding current round score to global score
    scores[current] += round;
    // Updating current global score
    document.getElementById('score-' + current).textContent = scores[current];
    // Check if the player already won
    if (scores[current] >= 100) {
        // Setting winner in UI
        let winner = document.getElementById('name-' + current);
        let winnerText = winner.textContent;
        winner.textContent = winnerText + ' Winner!';
        // Disabling buttons
        document.getElementById('btn-roll').disabled = true;
        document.getElementById('btn-hold').disabled = true;
        // Returning for end turn without switching player
        return;
    }
    // Switching player
    switchPlayer();
});

// Event listener for new game
document.getElementById('btn-new').addEventListener('click', init);

/**
 * Switch player turn by cleaning the round function and changing the current active player.
 */
function switchPlayer() {
    // Cleaning round core
    round = 0;
    // Cleaning current
    document.getElementById('current-' + current).textContent = round;
    // Next player turns
    current = (current === 1 ? 0 : 1);
    // Toggle active class for players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

/**
 * Init function
 */
function init() {
    // Variables initialization
    scores = [0, 0]; // Score by player
    round = 0; // Current round score
    current = 0; // Current player

    // Dice
    dice.style.display = 'none';

    // Names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //Scores
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Styles
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Enabling action buttons
    document.getElementById('btn-roll').disabled = false;
    document.getElementById('btn-hold').disabled = false;
}
