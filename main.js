document.onload = function() {
  let startScreen = document.getElementById('startScreen');
  let startGame = document.getElementById('startGame');
  startGame.addEventListener("click", function() {
    startScreen.style = 'display: none';
    const canvas = document.getElementById('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    const ctx = canvas.getContext('2d');
    let playScreen = document.getElementById('playScreen');
    playScreen.style = 'display: block';

    let game = new Game({
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

    game.onPause = () => {
      let pauseScreen = document.getElementById('pauseScreen');
      if (game.gamePaused === true) {
        console.log('game pause should appear')
        return pauseScreen.style = 'display: block';
      } else if (game.gamePaused === false) {
        console.log('game pause should dissappear')
        return pauseScreen.style = 'display: none';
      }
    }
  
    game.onGameOver = () => {
      let gameOver = document.getElementById('gameover');
      // canvas.style = 'display: none';
      playScreen.style = 'display: none';
      gameOver.style = 'display: block';
      let result = document.getElementById('result');
      result.innerHTML = game.zygotes;
      let startAgain = document.getElementById('startagain');
      startAgain.addEventListener("click", function () {
        gameOver.style = 'display: none';
        playScreen.style = 'display: block';
        game.restartGame();
      })
    }
  })
}();

