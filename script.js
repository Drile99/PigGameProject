/*
GAME RULES:

- The game has 2 players, playing in rounds;
- In each turn, a player rolls a dice as many times as he wishes. 
Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. after that, it's the next player's turn
- The player can chooseto 'Hold' which means that his ROUND score gets added to his GLOBAL score. After that,
it's the next player turn
- The first player to reach 100 points on GLOBAL score wins the game

UPDATE:
1. A player looses his ENTIRE score when he rolls two 6 in a row. It's the next player's turn.
2. Add an input field to the HTML where pleyers can set the winning score, 
so that they can change the predefined score of 100.
3. Add another dice to the game, so that there are two dicec now. The pleyers looses his current
score when one of them is a 1.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;




document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying = true) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';
        document.getElementById('dice-1').src = 'dice-' +dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' +dice2 + '.png';

        //------------------LAST VERSION, NOW UPDATE PART 3 --------------------------------//
       // var diceDOM = document.querySelector('.dice');
       // diceDOM.style.display = 'block';
        //diceDOM.src = 'dice-' + dice + '.png';


        //3. Update the round score but only IF the rolled number was NOT a 1
       /* if (dice === 6 && lastDice === 6) {
            //Pleyer looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player 
            nextPlayer();
        }
        lastDice = dice; */

        if (dice1 !== 1 && dice2!==1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player 
            nextPlayer();

    }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying = true) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;


        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        var input = document.querySelector('.final-score').value;
        var winningScore;

        //Undifined, 0, null oe "" are COERCED to false
        //Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if player won the game 
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display='none';
            document.getElementById('dice-1').style.display='none';
            document.querySelector('.player-' + activePlayer).classList.add('player-winner');
            document.querySelector('.player-' + activePlayer).classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }


});

//Button New game

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0').classList.remove('player-winner');
    document.querySelector('.player-1').classList.remove('player-winner');
    document.querySelector('.player-0').classList.remove('active');
    document.querySelector('.player-1').classList.remove('active');
    document.querySelector('.player-0').classList.add('active');

}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //OR
    /* if(activePlayer===0)
    {
        activePlayer=1;
    } else {
        activePlayer=0;
    }*/

    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
}