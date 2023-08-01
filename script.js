'use strict';
// selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currplayer0 = document.getElementById('current--0');
const currplayer1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnroll = document.querySelector('.btn--roll');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');

//stating the condition to follow
let scores, currscore, activePlayer, playing;

const returnback = function () {
  scores = [0, 0];
  currscore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currplayer0.textContent = 0;
  currplayer1.textContent = 0;
  diceEl.classList.add('hidden');
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--activePlayer'); //atleast ek tou hona hi chaiye
  player1el.classList.remove('player--activePlayer');
};
returnback();
//Switching PLayer
const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

//dice rolling machenism
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1.generating the randon number on the dice on the roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    // 2.displaying the dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //   3.Stating the condition of the dice roll
    if (dice !== 1) {
      // add the number to the score
      currscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currscore;
      // CHANGE REQUIRED AT THIS POINT
    } else {
      // Switch to the next player
      switchplayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`.dice`).classList.add('hidden');
    } else {
      switchplayer(); //han bhai mene hi likha hai
    }
  }
});
btnnew.addEventListener('click', returnback); //Javascript will call the function as soom as the user uses the button
