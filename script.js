'use strict';
//score 1

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player1El = document.querySelector('.player--1');
const player0El = document.querySelector('.player--0');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
//urrentScore1 = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  console.log('insdie player active');
  activePlayer = activePlayer == 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling a dice functionality
btnRoll.addEventListener('click', function () {
  console.log('inside roll');
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(typeof dice, dice);
    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. check for rolled 1, if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore; //changes in later stage
    } else {
      //switch to next player
      //playerActive.classList.add('player--active');
      /*document.getElementById(`current--${activePlayer}`).textContent = 0;
    console.log('insdie player active');
    activePlayer = activePlayer == 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');*/
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  //1. add current score to active players score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if players score is >=100
    if (scores[activePlayer] >= 20) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //3.switch to next player
    switchPlayer();

    //4 removing the dice image from  screen
    diceEl.classList.add('hidden');
    //btnHold.classList.add('hidden');
    //btnRoll.classList.add('hidden');
  } //else {
  //btnHold.classList.add('hidden');
  //btnRoll.classList.add('hidden');
  //}
});
btnNew.addEventListener('click', function () {
  console.log('inside new game');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  playing = true;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
});
