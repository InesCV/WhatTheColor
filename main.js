
document.onload = function() {
    const canvas = document.getElementById('WhatTheColor');
    canvas.width = document.body.clientWidth -20;
    canvas.height = document.body.clientHeight - 100;

    const ctx = canvas.getContext('2d');
    // canvas.addEventListener('click', function() { }, false);


  const game = new Game({
    width: canvas.width,
    height: canvas.height,
    ctx: ctx,
    canvas: canvas,
    possibleColors: ['#19FFFC', '#19FF2E', '#FE12FB']
  });
  game.startGame();
}();

