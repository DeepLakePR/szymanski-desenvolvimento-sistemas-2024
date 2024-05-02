// Box Collision
function boxCollision({ box1, box2 }) {
    return box1.attackBox.position.x + box1.attackBox.width >= box2.position.x
        &&
        box1.attackBox.position.x <= box2.position.x + box2.width
        &&
        box1.attackBox.position.y + box1.attackBox.height >= box2.position.y
        &&
        box1.attackBox.position.y <= box2.position.y + box2.height
}

// Determine Winner
function determineWinner({ player, enemy, timerId }) {

    clearTimeout(timerId);

    let gameResultText = 'Error on end game [G-01]';

    if (player.health === enemy.health) {
        // Tie
        gameResultText = 'Tie';

    } else if (player.health > enemy.health) {
        // Player 1 Wins
        gameResultText = 'Player 1 Wins!';

    } else {
        // Player 2 Wins
        gameResultText = 'Player 2 Wins!';

    }

    document.querySelector('#gameResult').innerHTML = gameResultText;
    document.querySelector('#gameResult').style.display = 'flex';

}

// Timer
let timer = 30
let timerId;

function gameTimer() {

    if (timer > 0) {

        timerId = setTimeout(gameTimer, 1000);
        timer--;

        document.querySelector('#barTimer').innerHTML = timer;

    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId });

    }

}
