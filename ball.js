class Ball {
  constructor(options) {
    this.elem = options.canvas;
    this.elemLeft = this.elem.offsetLeft;
    this.elemTop = this.elem.offsetTop;
    this.ctx = options.ctx;
    this.width = options.width;
    this.height = options.height;
    this.position = options.position;
    this.marginExit = options.marginExit;
    this.direction = {
      x: this.getDirection(this.position.x, this.width),
      y: this.getDirection(this.position.y, this.height)
    }
    this.color = options.color;
    this.moving = true;
    this.radius = options.radius;
    this.moveBall();

     // Add event listener for 'Click' events
    this.elem.addEventListener('click', function (event) {
      this.x = event.pageX - this.elemLeft;
      this.y = event.pageY - this.elemTop;
      // console.log (`BALL: I clicked exactly x:${this.x} y:${this.y}`)
      this.a = this.position.x - this.x;
      this.b = this.position.y - this.y;

      // Check if the ball is clicked
      if (this.clickedBall(this.a, this.b)) {
        if (this.moving === false) {
          this.moveBall();
        } else {
          this.pauseBall();
        }
      }
    }.bind(this));
  }

  getDirection(position, maxSize) {
    if (position < 0) {
      return 1
    } else if (position > maxSize) {
      return -1
    } else {
      return 0
    }
  }

  // getDirection() {
  //   if (this.position.x == this.low) {
  //     return this.direction = {
  //       x: 1,
  //       y: 0
  //     }
  //   } else if (this.position.x  == this.largeX) {
  //     return this.direction = {
  //       x: -1,
  //       y: 0
  //     }
  //   } else if (this.position.y == this.low) {
  //     return this.direction = {
  //       x: 0,
  //       y: 1
  //     }
  //   } else if (this.position.y == this.largeY) {
  //     return this.direction = {
  //       x: 0,
  //       y: -1
  //     }
  //   }
  // }

  clickedBall(a,b) {
    this.h = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    if (this.h <= this.radius + 10) {
      return true
    }
  }

  moveBall() {
    // this.speed = 1;
    // PONER EN UNA VARIABLE QUE SE PUEDA LLAMAR Y LIMPIAR

    this.ballMovement = setInterval(function () {
      this.position.x += (this.direction.x);
      this.position.y += (this.direction.y)
    }.bind(this), 20);
    // if (this.direction === 'right') {
    //   setInterval(this.position.x += this.speed, 10);
    // }
  }

  pauseBall() {
    this.speed = 0;
    this.direction.x = 0;
    this.direction.y = 0;
    this.moving = false;
    console.log(`ball is moving? ${this.moving}`)
    clearInterval(this.ballMovement);
  }

  changeDirection(homeX, homeY) {
    // this.speed = 1;
    this.moving = true;
    console.log(`ball is moving? ${this.moving}`)
    // Calculate the distance to move

    this.ballToHomeX = homeX - this.position.x;
    this.ballToHomeY = homeY - this.position.y;
    this.ballToHomeH = Math.sqrt(Math.pow(this.ballToHomeX,2) + Math.pow(this.ballToHomeY,2));
    // console.log(`Sir, the ball should be moving to direction: ${this.ballToHomeX} y:${this.ballToHomeY} route should be equal to hipotenusa:${this.ballToHomeH}`);
    this.direction.x = this.ballToHomeX/this.ballToHomeH;
    this.direction.y = this.ballToHomeY/this.ballToHomeH;
    console.log(`direction.x= ${this.direction.x} direction.y= ${this.direction.y}`)
    this.ballToHome = {
      x: homeX - this.position.x,
      y: homeY - this.position.y,
      h: Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    };
    // Move to that position
    setInterval(function () {
      this.position.x += (this.direction.x);
      this.position.y += (this.direction.y);
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
