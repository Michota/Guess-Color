"use strict";

// Selecting elements
const RColorEl = document.getElementById("Rcolor");
const GColorEl = document.getElementById("Gcolor");
const BColorEl = document.getElementById("Bcolor");
const squaresEl = document.querySelectorAll(".square");

// Settings the values
const mainColors = [0, 0, 0];
let colorarr = [0, 0, 0];
//changing squares to arrays

// randomizing colors
const randomizeColors = function () {
  for (let i = 0; i < mainColors.length; i++) {
    let color = Math.floor(Math.random() * 256);
    colorarr[i] = color;
  }
};
const colorizeSquares = function (square) {
  randomizeColors();
  let rcolor = colorarr[0];
  let gcolor = colorarr[1];
  let bcolor = colorarr[2];
  document.getElementById(square.id).style.backgroundColor = `rgb(${rcolor}, ${gcolor}, ${bcolor})`;
};

squaresEl.forEach(function (square) {
  //clicking squares
  square.addEventListener("click", () => {
    console.log(square.id);
  });
  colorizeSquares(square);
});

//document.getElementById(square.id).style.backgroundColor
