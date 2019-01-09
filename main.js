document.onload = function() {
  const canvas = document.getElementById('WhatTheColor');
  canvas.width = document.body.clientWidth -20;
  canvas.height = document.body.clientHeight - 100;
  const ctx = canvas.getContext('2d');

  const game = new Game({
    width: canvas.width,
    height: canvas.height,
    ctx: ctx,
    canvas: canvas,
    possibleColors: ['#19FFFC', '#19FF2E', '#7800FF'],
    possiblePositions: [
      {x:canvas.width, y:0}, 
      {x:canvas.width, y: canvas.height}, 
      {x: 0, y: canvas.height}, 
      {x: 0, y:0}]
  });
  game.startGame();

  game.onGameOver = () => {
    let gameOver = document.getElementById('gameover');
    canvas.style = 'display: none';
    gameOver.style = 'display: block';
  }
}();

