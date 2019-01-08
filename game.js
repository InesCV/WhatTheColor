class Game {
  constructor(options){ 
    this.width = options.width;
    this.height = options.height;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
    this.balls = [];
    this.fecundedBalls = [];
    this.homes = [];
    this.zygotes = 0;
    this.possibleColors = options.possibleColors;
    this.wrongColor = '#FF0000';
    this.possiblePositions = options.possiblePositions;
    this.gamePaused = false;
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

    ////// GAME OPERATIONS ///////
  
  getRandomColor() {
    return this.possibleColors[Math.floor(Math.random() * 3)]
  };

  // getRandomPosition() {
  //   this.x 
  // }

  // getRandomDirection() {
    
  // }

  getRandomNumber(max, min) {
    return Math.random() * (max - min) + min;
  };

  // getHomePosition() {
  //   console.log(this.possiblePositions[0]);
  //   return this.possiblePositions[this.homes.length]; 
  // }

  // getColorHome() {
  //   if (this.homes.length === 0) {
  //     getRandomColor();
  //   } else {

  //   }
  // }

  ////// GENERATE BALLS & HOMES ///////

  startBallCreation() {
    this.intervalCreationBall = setInterval(function() {
      this.generateBalls();
    }.bind(this), 3000);

    // clearInterval(this.intervalCreationBall)
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

  // generateHomes() {
  //     this.homes.push(new Home({
  //       width: this.width, 
  //       height: this.height, 
  //       canvas: this.canvas,
  //       ctx: this.ctx,
  //       balls: this.balls,
  //       // position: this.possiblePositions[0+i],
  //       // color: this.possibleColors[0+i]
  //     }));
  // }

  generateHomes() {
    for (let i = 0; i < 3; i++) {
      this.homes.push(new Home({
        width: this.width, 
        height: this.height, 
        canvas: this.canvas,
        ctx: this.ctx,
        balls: this.balls,
        position: this.possiblePositions[0+i],
        color: this.possibleColors[0+i]
      }));
    }
  }

    ////// GAME MECHANICS ///////

  _assignControlsToKeys () {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 13: //Enter
          if (this.gamePaused === false) {
            this.gamePaused = true;
            console.log('pause game')
            this.pauseGame();
          } else {
            this.gamePaused = false;
            console.log('play game')
            this.playGame();
          }
          break;
        case 8: //Delete
          console.log('If (zygots are more than X) this.balls = [] again');
          break;
      }
    };
  }

  pauseGame() {
    clearInterval(this.intervalCreationBall);
    this.balls.forEach(function (ball) {
      ball.pauseBall();
    });
  }

  playGame() {
    this.startBallCreation();
    this.balls.forEach(function (ball) {
      ball.moveBall();
    });
    
  }
 
   ////// DRAW STUFF ///////

  
  _drawBoard() {
    this.ctx.fillStyle = "#FBFFF8";
    // this.ctx.fillRect(0,0, this.ball.position.x, this.ball.position.y);
  }

  _drawBalls() {
    this.balls.forEach(function(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.position.x,ball.position.y,ball.radius,0,2*Math.PI);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
    }.bind(this))
    // this.ctx.stroke();
  }

  _drawFecundedBalls() {
    this.fecundedBalls.forEach(function(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.position.x,ball.position.y,ball.radius,0,2*Math.PI);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
    }.bind(this))
    // this.ctx.stroke();
  }

  _drawHomes() {
    this.homes.forEach(function(home){
      this.ctx.beginPath();
      this.ctx.arc(home.position.x,home.position.y,home.radius,0,2*Math.PI);
      this.ctx.fillStyle = home.color;
      this.ctx.fill();
    }.bind(this))    
    // this.ctx.stroke();
  }

  _clear() {
    // console.log(`the canvas width is ${this.width} and height is ${height}`)
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

   ////// COLLISIONS ///////

  _checkBallHomecollision() {
    this.balls.forEach(function (ball, index) {
     this.homes.forEach(function (home) {
       this.a = home.position.x - ball.position.x;
       this.b = home.position.y - ball.position.y;
       this.h = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.b,2));
       // console.log(`home radius is ${home.radius} and ball radius ${ball.radius}`);
       if (home.radius + ball.radius >= this.h) {
         console.log(`Sir, a ball went to a home`)
         this.checkSameColor(ball, home);
         this.fecundedBalls.push(this.balls[index]);
         console.log(`You got ${this.zygotes} zygotes`)
         this.balls.splice(index, 1)
         return true
       }
     }.bind(this))
   }.bind(this))
 }

  checkSameColor(item1, item2) {
    if (item1.color === item2.color) {
      this.zygotes += 1;
      console.log(`Sir, the ball went to the CORRECT Home`)
      item1.pauseBall();
      return true 
    } else {
      console.log(`MAYDAY MAYDAY WROOOOOONG BALLLL!`)
      item1.pauseBall();
      item1.color = '#FF0000';
      item2.color = '#FF0000';
      return false
    }
  }
  

  _update() {
    this._clear();
    this._drawBoard();
    this._drawBalls();
    this._drawFecundedBalls();
    this._drawHomes();
    this._checkBallHomecollision();
    this._assignControlsToKeys ()
    // this._sayLocation();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}