document.onload = function() {
  const canvas = document.getElementById('WhatTheColor');
  const ctx = canvas.getContext('2d');
  const widthCell = 10;

  const game = new Game({
    rows: canvas.width / widthCell,
    columns: canvas.clientHeight / widthCell,
    // ball: new Ball(canvas.width / widthCell, canvas.height / widthCell),
    ctx: ctx
  });

  game.startGame();
}();

