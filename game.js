class Game {
  constructor(options){ 
    this.width = options.width;
    this.height = options.height;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
    this.balls = [];
    this.homes = [];
    this.possibleColors = options.possibleColors;
    // this.ballToHome = changeDirection();
    this.generateBalls();
    this.generateHomes();
    this.startBallCreation();
  }

  startGame() {
    this._update();
    // this.ball.start();
    // Set interval irá aquí
    // this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

    ////// GAME MECHANICS ///////

  // ballToHome() {
  //   this.homes.forEach(function(home) {
  //     if (home.clickedHome(home.a, home.b)) {
  //       console.log('The ball should go home')
  //     }
  //   }
  // }

  // changeDirection() {
  //   console.log('Direction changed')
  // }

    ////// GAME OPERATIONS ///////
  
  getRandomColor() {
    return this.possibleColors[this.getRandomNumber(3)]
  };

  getRandomNumber(items) {
    return Math.floor(Math.random() * items)
  };

  ////// GENERATE BALLS & HOMES ///////

  startBallCreation() {
    setInterval(function() {
      this.generateBalls();
    }.bind(this), 3000);
  }

  generateBalls() {
    this.balls.push(new Ball({
      width: this.width, 
      height: this.height, 
      canvas: this.canvas,
      ctx: this.ctx,
      homes: this.homes,
      color: this.getRandomColor()
      // ballToHome: this.ballToHome
    }));
  }

  generateHomes() {
    this.homes.push(new Home({
      width: this.width, 
      height: this.height, 
      canvas: this.canvas,
      ctx: this.ctx,
      balls: this.balls,
      ballToHome: this.ballToHome
    }));
  }
 
   ////// DRAW STUFF ///////

  
  _drawBoard() {
    this.ctx.fillStyle = "#FBFFF8";
    // this.ctx.fillRect(0,0, this.ball.position.x, this.ball.position.y);
  }

  _drawBalls() {
   // Hacer un loop ForEach cuando tengas más de una bola (hacer un array de bolas)
    this.balls.forEach(function(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.position.x,ball.position.y,ball.radius,0,2*Math.PI);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
    }.bind(this))
    // this.ctx.stroke();
  }

  _drawHomes() {
    // Hacer un loop ForEach cuando tengas más de una bola (hacer un array de casas)
    this.ctx.beginPath();
    this.ctx.arc(this.homes[0].position.x,this.homes[0].position.y,this.homes[0].radius,0,2*Math.PI);
    this.ctx.arc(0,this.height,this.height/4,0,2*Math.PI);
    this.ctx.fillStyle = '#19FFFC';
    // this.ctx.fillStyle = '#19FF2E';
    this.ctx.fill();
    // this.ctx.stroke();
  }

  _clear() {
    // console.log(`the canvas width is ${this.width} and height is ${height}`)
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  _update() {
    this._clear();
    this._drawBoard();
    this._drawBalls();
    this._drawHomes();
    // this._sayLocation();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}