document.onload = function() {
  const canvas = document.getElementById('WhatTheColor');
  const ctx = canvas.getContext('2d');

  const game = new Game({
    // scene = {
    //   width: canvas.width,
    //   height: canvas.width
    // },
    // ball: new Ball(0, canvas.height / 2, 'right'),
    ctx: ctx
  });

  game.startGame();
}();

