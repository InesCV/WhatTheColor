document.onload = function() {
  let startScreen = document.getElementById('startScreen');
  let startGame = document.getElementById('startGame');
  startGame.addEventListener("click", function() {
    startScreen.style = 'display: none';
    const canvas = document.getElementById('canvas');
    canvas.width = document.body.clientWidth -5;
    canvas.height = document.body.clientHeight -5;
    const ctx = canvas.getContext('2d');
    let playScreen = document.getElementById('playScreen');
    playScreen.style = 'display: block';
    canvas.style = 'display: block';

    function startAgain() {
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
    
      game.onGameOver = () => {
        let gameOver = document.getElementById('gameover');
        canvas.style = 'display: none';
        playScreen.style = 'display: none';
        gameOver.style = 'display: block';
        let result = document.getElementById('result');
        result.innerHTML = game.zygotes;
        let startAgain = document.getElementById('startagain');
        startAgain.addEventListener("click", function () {
          canvas.style = 'display: block';
          gameOver.style = 'display: none';
          // Como hacer que se cargue de nuevo solo el canvas y no toda la partida?
          window.location.reload(true);
        })
      }
    }

  startAgain();
  })


  

}();

