
document.onload = function() {
    const canvas = document.getElementById('WhatTheColor');
    canvas.width = document.body.clientWidth -20;
    canvas.height = document.body.clientHeight - 100;

    const ctx = canvas.getContext('2d');

  const game = new Game({
    width: canvas.width,
    height: canvas.height,
    ctx: ctx,
    canvas: canvas
  });
  game.startGame();
}();

