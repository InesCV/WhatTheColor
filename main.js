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
    let game;

    let newGame = () => {
      game = new Game({
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
          return pauseScreen.style = 'display: flex';
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
          // newGame();
          // game.restartGame();
        })
      }
    }
    newGame();
    // document.getElementById('startagain').onclick(newGame);
    document.getElementById('startagain').addEventListener("click", newGame);
  })
}();



// function initBt4() {
//   var bt = document.querySelectorAll('#component-4')[0];
//   var bg = document.querySelectorAll('#component-4 .button')[0];
//   var blob = document.querySelectorAll('#component-4 .blob');
//   var filter = document.querySelector('#filter-goo-4 feGaussianBlur');

//   bt.addEventListener('mousemove', function(e) {
//     var x = (e.pageX - bt.offsetLeft - bt.offsetWidth / 2) * 0.6;
//     var y = (e.pageY - bt.offsetTop - bt.offsetHeight / 2) * 0.6;

//     TweenLite.to(blob[1], 4.2, { x: x, y: y, ease: Elastic.easeOut.config(1, 0.1) });
//     TweenLite.to(blob[2], 2.8, { x: x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
//     TweenLite.to(blob[3], 2.8, { x: -x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
//     TweenLite.to(filter, 5, { onUpdate: function() { filter.setAttribute('x', 0); }});
//   });

//   bt.addEventListener('mouseup', function(e) {
//     var x = e.pageX - bt.offsetLeft - blob[0].offsetWidth / 2;
//     var y = e.pageY - bt.offsetTop - blob[0].offsetHeight / 2;

//     var dirX = Math.random() > 0.5 ? -1 : 1;
//     var dirY = Math.random() > 0.5 ? -1 : 1;
//     var r = getRandom(60, 80);
    
//     Array.prototype.slice.call(blob, 1).forEach(function(bt) {
//       var tl = new TimelineLite();
//       tl.to(bt, 1.2, { x: dirX * r * Math.random() + '%', y: dirY * r * Math.random() + '%', ease: Elastic.easeOut.config(1, 0.2) });
//       tl.to(bt, 1.2, { x: '0%', y: '0%', ease: Elastic.easeOut.config(1, 0.2) }, '-=1.1');
//     });
//   });
// }

