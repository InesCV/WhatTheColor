class Game {
  constructor(options){ 
    this.width = options.width; // Width of the canvas according to the screen
    this.height = options.height; // Height of the canvas according to the screen
    this.ctx = options.ctx; // Inheritance of the context
    this.canvas = options.canvas; // Inheritance of the canvas itself
    this.balls = []; // Arrays of moving balls in the screen
    this.fecundedBalls = []; // Array of balls that already reached a home
    this.enemyBalls = []; //  Array of balls that can't touch you
    this.homes = []; // Array of homes
    this.zygotes = 0; // Number of balls that collisioned with a home
    this.possibleColors = options.possibleColors; // Possible ball and home colors
    this.wrongColor = '#FF0000'; // Color used to warn you are about or already lost the game
    this.possiblePositions = options.possiblePositions; // Possible home positions
    this.homeRadius = this.height/3.5; // Radius of the home
    this.ballRadius = this.height/23; // Radius of the ball
    this.gamePaused = false; // Boolean to know if the game is paused
    this.marginExit = this.ballRadius*2; // Margin outside of the canvas where the ball will appear
    this.carefulDistance = this.height * 0.2; // Warning distance when ball is about to leave the canvas
    this.ballCreationTimer = 2000; // Interval time for the creation of balls
    this.intervalGame = undefined;
    this._generateBalls(); // Create the first ball
    this._generateHomes(); // Create the three Homes
    this._startBallCreation(); // Call an interval that creates more balls
    this._addZygotesDOM() // Update DOM about the number of zygotes archieved
  }
  
  startGame() {
    this._update();
  }

  restartOldGame () {
    this.balls = [];
    this.fecundedBalls = [];
    this.homes = [];
    this.zygotes = 0;
    this.ballCreationTimer = 0;
    this._addZygotesDOM();
    clearInterval(this.intervalIDCreationBall);
    clearInterval(this.intervalGame);
  }

  // restartGame () {
  //   this.balls = [];
  //   this.fecundedBalls = [];
  //   this.homes = [];
  //   this.zygotes = 0;
  //   this.ballCreationTimer = 2000;
  //   this._addZygotesDOM();
  //   clearInterval(this.intervalIDCreationBall);
  //   clearInterval(this.intervalGame);
  //   this._generateBalls();
  //   this._generateHomes();
  //   this._startBallCreation();
  //   this._update();
  // }

  //====================== GAME OPERATIONS =======================
  
  getRandomNumber(max, min) {
    return Math.random() * (max - min) + min;
  };

  getRandomIntegerNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  getRandomColor() {
    return this.possibleColors[this.getRandomIntegerNumber(3,0)]
  };

  //===================== RANDOM BALL EXIT ======================

  getRandomPosition() {
    this.exitAxis = this.getRandomIntegerNumber(2,0);
    if (this.exitAxis === 0) {
      // Cuando la vola sale de uno de los ejes Y
      return this.position = {
        x: this.getPositionRange(this.width),
        y: this.getPositionBinary(this.height)
      }
    } else {
      // Cuando la vola sale de uno de los ejes X
      return this.position = {
        x: this.getPositionBinary(this.width),
        y: this.getPositionRange(this.height)
      }
    }
  }

  // getPositionRange(heightOrWidth) {
  //   this.minExitPoint = this.homeRadius + 50;
  //   this.maxExitPoint = heightOrWidth - this.homeRadius -50;
  //   if (this.enemyBalls.length > 0) {
  //     this._avoidEnemyPosition();
  //   } else {
  //     return this.getRandomNumber(this.minExitPoint, this.maxExitPoint)
  //   }
  // }

  getPositionRange(heightOrWidth) {
    this.minExitPoint = this.homeRadius + 50;
    this.maxExitPoint = heightOrWidth - this.homeRadius -50;
    return this.getRandomNumber(this.minExitPoint, this.maxExitPoint)
  }

  getPositionBinary(heightOrWidth) {
    this.possibleBinaryExit = [- this.marginExit, heightOrWidth + this.marginExit];
    this.binaryExit = this.possibleBinaryExit[this.getRandomIntegerNumber(2,0)];
    return this.binaryExit
  }

  // _avoidEnemyPosition() {
  //   this.randomPosition = this.getRandomNumber(this.minExitPoint, this.maxExitPoint);
  //   this.enemyBalls.forEach(function (enemy) {
  //     if enem
  //     if (this.randomPosition <= enemy.position.x - enemy.radius && this.randomPosition >= enemy.position.x + enemy.radius) {
  //       console.log('iban a salir por el mismo sitio')
  //     }
  //   return this.randomPosition;
  //   }.bind(this))
  // }

  //================= GENERATE BALLS & HOMES ====================

  _startBallCreation() {
    this.intervalIDCreationBall = setInterval(function() {
      this._generateBalls();
    }.bind(this), this.ballCreationTimer);
  }

  _generateBalls() {
    this.balls.push(new Ball({
      width: this.width, 
      height: this.height, 
      canvas: this.canvas,
      ctx: this.ctx,
      homes: this.homes,
      radius: this.ballRadius,
      marginExit: this.marginExit,
      color: this.getRandomColor(),
      position: this.getRandomPosition()
    }));
  }

  _generateEnemyBalls() {
    this.enemyBalls.push(new Ball({
      width: this.width, 
      height: this.height, 
      canvas: this.canvas,
      ctx: this.ctx,
      homes: this.homes,
      radius: this.ballRadius,
      marginExit: this.marginExit,
      color: '#621348',
      position: this.getRandomPosition()
    }));
  }

  // IN CASE WE WANT RANDOM HOME POSITIONS AND COLORS
  // _generateHomes() {
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

  _generateHomes() {
    for (let i = 0; i < 3; i++) {
      this.homes.push(new Home({
        width: this.width, 
        height: this.height, 
        canvas: this.canvas,
        ctx: this.ctx,
        balls: this.balls,
        radius: this.homeRadius,
        position: this.possiblePositions[0+i],
        color: this.possibleColors[0+i]
      }));
    }
  }

  //======================== GAME MECHANICS =====================

  _assignControlsToKeys () {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 13: //Enter
          if (this.gamePaused === false) {
            this.gamePaused = true;
            console.log('pause game')
            this.pauseGame();
            this.onPause();
          } else {
            this.gamePaused = false;
            console.log('play game')
            this.playGame();
            this.onPause();
          }
          break;
        case 8: //Delete
          this._clearBalls();
          console.log('You lost 5 zygots to clear the screen');
          break;
      }
    };
  }

  pauseGame() {
    clearInterval(this.intervalIDCreationBall);
    this.balls.forEach(function (ball) {
      ball.pauseBall();
    });
    this.enemyBalls.forEach(function (ball) {
      ball.pauseBall();
    });
    window.cancelAnimationFrame(this.intervalGame)
  }

  playGame() {
    this._startBallCreation();
    this.balls.forEach(function (ball) {
      ball.moveBall(ball.speed);
    });
    this.enemyBalls.forEach(function (ball) {
      ball.moveBall(ball.speed);
    });
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this))
  }

  _gameOverWait(item) {
    window.cancelAnimationFrame(this.intervalGame);
    this.pauseGame();
    this.waitingSecond = setTimeout(function() {
      // console.log('waiting a second')
      item();
    }, 500)
  }

  _clearBalls() {
    this.balls.splice(0, this.balls.length);
    this.zygotes -= 5;
    this._addZygotesDOM ()
  }
 
  //======================== DRAW CANVAS ========================

  _drawBalls() {
    this.balls.forEach(function(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.position.x,ball.position.y,ball.radius,0,2*Math.PI);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
    }.bind(this))
  }

  callDrawTail() {
    this.balls.forEach(function(ball) {
      ball.tail.updateFrameX();
      ball.tail.drawTail(ball.position.x, ball.position.y);
    }.bind(this))
  }

  enemyTail() {
    this.enemyBalls.forEach(function(ball) {
      ball.tail.updateFrameX();
      ball.tail.drawTail(ball.position.x, ball.position.y);
    }.bind(this))
  }

  _drawFecundedBalls() {
    this.fecundedBalls.forEach(function(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.position.x,ball.position.y,ball.radius,0,2*Math.PI);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
    }.bind(this))
  }

  _drawEnemyBalls() {
    this.enemyBalls.forEach(function(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.position.x,ball.position.y,ball.radius,0,2*Math.PI);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
    }.bind(this))
  }

  _drawHomes() {
    this.homes.forEach(function(home){
      this.ctx.beginPath();
      this.ctx.arc(home.position.x,home.position.y,home.radius,0,2*Math.PI);
      this.ctx.fillStyle = home.color;
      this.ctx.fill();
    }.bind(this))    
  }

  _drawMyName() {
    this.ctx.font = "1em Quicksand";
    this.ctx.fillStyle = "#7800FF"
    this.ctx.textAlign = "center";
    this.ctx.fillText("IronHack Game made by © Ines CV", canvas.width/2, canvas.height - 10);
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

 //==================== GAME CHECK, COLLISIONS & GAME OVER ====================

  _checkBallHomecollision() {
    this.balls.forEach(function (ball, index) {
     this.homes.forEach(function (home) {
       this.a = home.position.x - ball.position.x;
       this.b = home.position.y - ball.position.y;
       this.h = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.b,2));
       if (home.radius + ball.radius >= this.h) {
         this._checkSameColor(ball, home);
         this.fecundedBalls.push(this.balls[index]);
         this.balls.splice(index, 1)
         return true
       }
     }.bind(this))
   }.bind(this))
 }

 _checkBallEnemycollision() {
  this.balls.forEach(function (ball, index) {
   this.enemyBalls.forEach(function (enemy) {
     this.a = enemy.position.x - ball.position.x;
     this.b = enemy.position.y - ball.position.y;
     this.h = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.b,2));
     if (enemy.radius + ball.radius >= this.h && ball.ballEnemyCrash === false) {
      ball.direction.x = (-ball.direction.x);
      ball.direction.y = (-ball.direction.y);
      ball.tail.updateFrameY(ball.tail.spriteYcolor(ball.color), ball.direction.x, ball.direction.y);   
      ball.ballEnemyCrash = true;
     }
   }.bind(this))
 }.bind(this))
}

 _fecundedBallHome() {
  this.fecundedBalls.forEach(function (ball, index) {
   this.homes.forEach(function (home) {
     this.a = home.position.x - ball.position.x;
     this.b = home.position.y - ball.position.y;
     this.h = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.b,2));
     if (this.h <= home.radius - ball.radius) {
       this.fecundedBalls.splice(index, 1)
       return true
     }
   }.bind(this))
 }.bind(this))
}

  _checkSameColor(item1, item2) {
    if (item1.colorOriginal === item2.color) {
      item1.fecundedBall(item1.colorOriginal);
      this.zygotes += 1;
      if (this.zygotes <= 20) {
        this._levelUp();
      }
      if (this.zygotes % 5 === 0) {
        this._generateEnemyBalls();
      }
      return this._addZygotesDOM();
    } else {
      item1.fecundedBall('#FF0000');
      item1.color = '#FF0000';
      item2.color = '#FF0000';
      return this._gameOverWait(this.onGameOver);
    }
  }

  _addZygotesDOM () {
    let zygotesScreen = document.getElementById('zygots'); 
    zygotesScreen.innerHTML = this.zygotes;
    return zygotesScreen;
  }

  _checkBallLeftCanvas() {
    this.balls.forEach(function (ball, index) {
      if ((ball.direction.x > 0 && ball.position.x > (canvas.width + this.marginExit)) || (ball.direction.x < 0 && ball.position.x < (0 - this.marginExit)) || (ball.direction.y > 0 && ball.position.y > (canvas.height + this.marginExit)) || (ball.direction.y < 0 && ball.position.y < (0 - this.marginExit))) {
        console.log('GAME OVER');
        this.balls.splice(index, 1);
        ball.pauseBall();
        return this._gameOverWait(this.onGameOver)
      } else if ((ball.direction.x === 1 && ball.position.x > (canvas.width - this.carefulDistance)) || (ball.direction.x === -1 && ball.position.x < (0 + this.carefulDistance)) || (ball.direction.y === 1 && ball.position.y > (canvas.height - this.carefulDistance)) || (ball.direction.y === -1 && ball.position.y < (0 + this.carefulDistance))) {
          if (ball.inDangerZone === false) {
            this._dangerZone(ball);
            ball.inDangerZone = true;
          }
      }
    }.bind(this))
  }

  _dangerZone(ball) {
    console.log('CAREFUL!!!!!!!!');
    ball.color = '#FF0000';
    ball.tail.updateFrameY(ball.tail.spriteYcolor(ball.color), ball.direction.x, ball.direction.y);   
  }

  _checkEnemyLeftCanvas() {
    this.enemyBalls.forEach(function (ball, index) {
      if ((ball.direction.x === 1 && ball.position.x > (canvas.width + this.marginExit)) || (ball.direction.x === -1 && ball.position.x < (0 - this.marginExit)) || (ball.direction.y === 1 && ball.position.y > (canvas.height + this.marginExit)) || (ball.direction.y === -1 && ball.position.y < (0 - this.marginExit))) {
        this.enemyBalls.splice(index, 1);
      }
    }.bind(this))
  }

  isThereEnemyBall() {
    if (this.enemyBalls.length > 0) {
      this.enemyTail();
      this._drawEnemyBalls();
      this._checkBallEnemycollision();
      this._checkEnemyLeftCanvas();
    }
  }

  //======================= ADDED DIFFICULTY ======================

   _levelUp() {
    clearInterval(this.intervalIDCreationBall);
    this.ballCreationTimer = this.ballCreationTimer * 0.95;
    this._startBallCreation();
   }
  
  //====================== UPDATE GAME REQUEST ====================

  _update() {
    this._clear();
    this.callDrawTail();
    this._drawBalls();
    this._drawFecundedBalls();
    this.isThereEnemyBall();
    this._drawHomes();
    this._drawMyName();
    this._checkBallHomecollision();
    this._fecundedBallHome()
    this._checkBallLeftCanvas();
    this._assignControlsToKeys ();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}