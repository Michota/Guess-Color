"use strict";

// Selecting elements
const randomizedColorEl = document.querySelector(".randomizedColor");
const squaresEl = document.querySelectorAll(".square");
const topEl = document.querySelector(".top");
const hardModeBtn = document.querySelector(".hardModeBtn");
const restartBtn = document.querySelector(".restartBtn");
const scoreEl = document.getElementById("score");
const topText = document.getElementById("guessthe");

// Hard Mode
let hardMode = 0;
// Settings the values
let mainColors = [0, 0, 0];
let colorarr = [0, 0, 0];
let squareColors = [[], [], [], [], [], [], [], [], []];
let score = 0;

// deafultValuesobj
let isGameActive = 1;
let didHeWon = 0;
let time = 10;
//// Hard mode button
hardModeBtn.addEventListener("click", () => {
  hardModeOn();
});
// Hard Mode On
const hardModeOn = function () {
  if (isGameActive) {
    hardMode === 1 ? (hardMode = 0) : (hardMode = 1);
    console.log(`${hardMode === 0 ? "HardMode Off" : "HardMode On"}`);
    hardModeBtn.classList.toggle("clickedHardModeBtn");
    startgame();
  }
};

const startgame = function () {
  //changing squares to arrays

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  // randomizing colors
  const randomizeColors = function () {
    if (hardMode === 0) {
      for (let i = 0; i < mainColors.length; i++) {
        let color = Math.floor(Math.random() * 256);
        colorarr[i] = color;
      }
    } else {
      let color = 0;
      let randomNum = Math.random();

      //randomizing ranndomNum
      if (randomNum >= 0.5) {
        colorarr[0] = Math.floor(Math.random() * 256);
        colorarr[1] = colorarr[0];
        colorarr[2] = colorarr[0];
      } else {
        colorarr[0] = Math.floor(Math.random() * 256);
        colorarr[1] = colorarr[0];
        colorarr[2] = Math.floor(Math.random() * 256);
      }
    }
  };

  // working properly
  // const randomizeColors = function () {
  //   for (let i = 0; i < mainColors.length; i++) {
  //     let color = Math.floor(Math.random() * 256);
  //     colorarr[i] = color;
  //   }
  // };

  // changing squares colors
  // working properly
  const colorizeSquares = function (square) {
    randomizeColors();
    let rcolor = colorarr[0];
    let gcolor = colorarr[1];
    let bcolor = colorarr[2];
    document.getElementById(square.id).style.backgroundColor = `rgb(${rcolor}, ${gcolor}, ${bcolor})`;
    squareColors[square.id] = [colorarr[0], colorarr[1], colorarr[2]];
  };

  //settings buttons and clicking them
  squaresEl.forEach(function (square) {
    //clicking squares
    square.addEventListener("click", () => {
      if (isGameActive) {
        checking(square);
      }
    });
    colorizeSquares(square);
  });

  // main color randomization
  const randomizingMainColors = function () {
    const chosenSquare = Math.floor(Math.random() * 9);
    mainColors = squareColors[chosenSquare];
    randomizedColorEl.textContent = mainColors.toString();
  };

  //check if he guessed correctly
  const checking = function (square) {
    if (squareColors[square.id] === mainColors) {
      winner(square);
    } else {
      loser(square);
    }
  };

  //PlayerWon
  const winner = function (square) {
    square.textContent = "✔";
    topEl.style.backgroundColor = square.style.backgroundColor;
    isGameActive = 0;
    document.getElementById("guessthe").textContent = "Correct!";
    addScore();
    window.setTimeout(() => {
      restart(square);
    }, 2000);
  };

  const addScore = () => {
    score++;
    scoreEl.textContent = score;
  };

  const loser = function (square) {
    square.textContent = "✖";
    square.style.color = "red";
    isGameActive = 0;
    score = 0;
    document.getElementById("guessthe").textContent = "Wrong!";
    window.setTimeout(() => {
      location.reload();
    }, 2000);
  };

  const restart = function (square) {
    console.log("restared");
    mainColors = [0, 0, 0];
    colorarr = [0, 0, 0];
    squareColors = [[], [], [], [], [], [], [], [], []];

    // deafultValues
    isGameActive = 1;
    didHeWon = 0;
    time = 10;
    square.textContent = "";
    topEl.style.backgroundColor = "#444444;";
    topText.textContent = "Guess the color";
    startgame();
  };

  //10 seconds countdown
  const timer = function () {};

  // startup
  randomizingMainColors();
};

startgame();
