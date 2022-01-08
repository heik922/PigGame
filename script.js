'use strict';

const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const player = document.querySelectorAll('.player');
let playing = true;

// Roll Dice button
btnRollDice.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    let currentPlayer = getCurrentPlayer();

    document.querySelector('img').src = `dice-${dice}.png`;
    if (dice === 1) {
      document.querySelector(
        '#current--' + String(currentPlayer)
      ).textContent = 0;
      switchPlayer();
    } else {
      addCurrentScore(dice);
    }
  }
});

// Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    let score = getCurrentScore();
    addTotalScore(score);
    let TotalScore = Number(
      document.querySelector('#score--' + String(getCurrentPlayer()))
        .textContent
    );
    if (TotalScore >= 100) {
      let winner = getCurrentPlayer();
      player[winner].classList.add('player--winner');
      playing = false;
    }
    switchPlayer();
  }
});

// new game button
btnNewGame.addEventListener('click', function () {
  for (let i = 0; i < player.length; i++) {
    document.querySelector('#current--' + String(i)).textContent = 0;
    document.querySelector('#score--' + String(i)).textContent = 0;
    player[i].classList.remove('player--winner');
  }
  if (player[1].classList.contains('player--active')) {
    player[1].classList.remove('player--active');
    player[0].classList.add('player--active');
  }
});

function getCurrentPlayer() {
  if (player[0].classList.contains('player--active')) {
    return 0;
  } else {
    return 1;
  }
}

function switchPlayer() {
  let currentPlayer = getCurrentPlayer();
  if (currentPlayer === 0) {
    player[0].classList.remove('player--active');
    player[1].classList.add('player--active');
  } else {
    player[1].classList.remove('player--active');
    player[0].classList.add('player--active');
  }
}

function getCurrentScore() {
  let player = getCurrentPlayer();
  return Number(
    document.querySelector('#current--' + String(player)).textContent
  );
}

function addCurrentScore(number) {
  let player = getCurrentPlayer();
  let currentScore = Number(
    document.querySelector('#current--' + String(player)).textContent
  );
  currentScore += number;
  document.querySelector('#current--' + String(player)).textContent =
    currentScore;
}

function addTotalScore(number) {
  let player = getCurrentPlayer();
  let totalScore = Number(
    document.querySelector('#score--' + String(player)).textContent
  );
  totalScore += number;
  document.querySelector('#score--' + String(player)).textContent = totalScore;
}
