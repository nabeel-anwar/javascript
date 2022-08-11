'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//Initial
let score = [0, 0];
let currentPlayer = 0;
let currentScore = 0;
let playing = true;

const Initial = function () {
    score = [0, 0];
    currentPlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');

}

Initial();

const shiftPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${currentPlayer}`).textContent = currentScore;

    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        //rolling the dice
        const dice = Math.trunc((Math.random() * 6) + 1);

        //displaying the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //check for dice not equal to 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        } else {
            shiftPlayer();

        }
    }

});

btnHold.addEventListener('click', function () {
    if (playing) {

        //storing the current player score
        score[currentPlayer] += currentScore;

        //displaying the Player score
        document.getElementById(`score--${currentPlayer}`).textContent = score[currentPlayer];


        if (score[currentPlayer] >= 20) {
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            playing = false;
        } else {
            shiftPlayer();
        }
    }
});

btnNew.addEventListener('click', Initial);