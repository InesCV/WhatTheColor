class Ball {
  constructor(options) {
    this.position = {
      x: -10,
      y: (options.height / 2)
    };
    this.color = options.color;
    this.radius = 30;
    this.moveBall();
    // this._consoleLogPosition();
    this.elem = options.canvas;
    this.elemLeft = this.elem.offsetLeft;
    this.elemTop = this.elem.offsetTop;
    this.ctx = options.ctx;

     // Add event listener for 'Click' events
    this.elem.addEventListener('click', function (event) {
      this.x = event.pageX - this.elemLeft;
      this.y = event.pageY - this.elemTop;
      // console.log (`BALL: I clicked exactly x:${this.x} y:${this.y}`)
      this.a = this.position.x - this.x;
      this.b = this.position.y - this.y;

      // Check if the ball is clicked
      if (this.clickedBall(this.a, this.b)) {
        // console.log(`BALL: I clicked a FUCKING ball in x:${this.x} y:${this.y}`);
        if (this.speed === 0) {
          this.moveBall();
        } else {
          this.pauseBall();
        }
      }
    }.bind(this));
  }

  clickedBall(a,b) {
    this.h = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    if (this.h <= this.radius + 10) {
      return true
    }
  }

  moveBall() {
    this.speed = 1;
    // PONER EN UNA VARIABLE QUE SE PUEDA LLAMAR Y LIMPIAR

    this.ballMovement = setInterval(function () {
      this.position.x += this.speed;
    }.bind(this), 20);
    // if (this.direction === 'right') {
    //   setInterval(this.position.x += this.speed, 10);
    // }
  }

  pauseBall() {
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    clearInterval(this.ballMovement);
  }

  changeDirection(homeX, homeY) {
    this.speed = 1;
    // Calculate the distance to move

    this.ballToHomeX = homeX - this.position.x;
    this.ballToHomeY = homeY - this.position.y;
    this.ballToHomeH = Math.sqrt(Math.pow(this.ballToHomeX,2) + Math.pow(this.ballToHomeY,2));
    // console.log(`Sir, the ball should be moving to direction: ${this.ballToHomeX} y:${this.ballToHomeY} route should be equal to hipotenusa:${this.ballToHomeH}`);
    this.speedX = this.ballToHomeX/this.ballToHomeH;
    this.speedY = this.ballToHomeY/this.ballToHomeH;
    // console.log(`speedX= ${this.speedX} speedY= ${this.speedY}`)
    this.ballToHome = {
      x: homeX - this.position.x,
      y: homeY - this.position.y,
      h: Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    };
    // Move to that position
    setInterval(function () {
      this.position.x += (this.speedX);
      this.position.y += (this.speedY);
    }.bind(this))


    // this.ballDestination = {
    //   goToX: homeX - this.position.x,
    //   goToY: homeY - this.position.y,
    //   goToPath: Math.sqrt(Math.pow(this.ballDestination.goToX,2) + Math.pow(this.ballDestination.goToY,2))
    // }
    // console.log(`Sir, the ball should be moving to direction: x:${this.ballDestination.goToX} y:${this.ballDestination.goToY} route should be equal to hipotenusa:${this.ballDestination.goToPath}`);
    // this.speedToDestination = {
    //   speedX: this.ballDestination.goToX/this.ballDestination.goToPath,
    //   speedY: this.ballDestination.goToY/this.ballDestination.goToPath
    // }
    // console.log(`speedX= ${this.speedToDestination.speedX} speedY= ${this.speedToDestination.speedY}`);
    // console.log(this.position.x += (this.ballDestination.goToX/this.ballDestination.goToPath));
    // setInterval(function () {
    //   this.position.x += this.speedToDestination.speedX;
    //   this.position.y += this.speedToDestination.speedY;
    // }.bind(this))

  }

  _consoleLogPosition() {
    setInterval(function() {
      console.log(`The ball is in x:${this.position.x} y:${this.position.y}`);
    }.bind(this), 5000);
  }

  // _moveForward () {
  //   this.position.x = this.position.x +1;
  //   console.log(this.position.x)
  // }

  // _sayLocation() {

  // }
}
