class Game {
  constructor(options){ 
    this.width = options.width;
    this.height = options.height;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
    this.balls = [];
    this.homes = [];
    this.possibleColors = options.possibleColors;
    this.possiblePositions = options.possiblePositions;
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
    setInterval(function() {
      this.generateBalls();
    }.bind(this), 10000);
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
    this.balls.forEach(function (ball) {
     this.homes.forEach(function (home) {
       this.a = home.position.x - ball.position.x;
       this.b = home.position.y - ball.position.y;
       this.h = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.b,2));
       // console.log(`home radius is ${home.radius} and ball radius ${ball.radius}`);
       if (home.radius + ball.radius >= this.h) {
         console.log(`Sir, a ball went to a home`)
         this.checkSameColor(ball, home)
         return true
       }
     }.bind(this))
   }.bind(this))
 }

  checkSameColor(item1, item2) {
    if (item1.color === item2.color) {
      console.log(`Sir, the ball went to the CORRECT Home`)
      return true 
    } else {
      console.log(`MAYDAY MAYDAY WROOOOOONG BALLLL!`)
      return false
    }
  }
  

  _update() {
    this._clear();
    this._drawBoard();
    this._drawBalls();
    this._drawHomes();
    this._checkBallHomecollision();
    // this._sayLocation();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}