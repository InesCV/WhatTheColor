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
    this.colorOriginal = options.color;
    this.moving = true;
    this.radius = options.radius;
    this.speed = 8;
    this.carefulColor = 0;
    this.moveBall(this.speed);

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
          this.moveBall(this.speed);
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

  moveBall(speed) {
    this.moving = true;
    this.ballMovement = setInterval(function () {
      this.position.x += (this.direction.x);
      this.position.y += (this.direction.y)
    }.bind(this), speed);

  }

  pauseBall() {
    this.moving = false;
    clearInterval(this.ballMovement);
  }

  fecundedBall() {
    this.pauseBall();
    this.direction.x = 0;
    this.direction.y = 0;
    // console.log(`ball is moving? ${this.moving}`)
    clearInterval(this.ballMovement);
  }

  changeDirection(homeX, homeY) {
    this.moving = true;
    this.color = this.colorOriginal;
    // Calculate the new direction
    this.ballToHomeX = homeX - this.position.x;
    this.ballToHomeY = homeY - this.position.y;
    this.ballToHomeH = Math.sqrt(Math.pow(this.ballToHomeX,2) + Math.pow(this.ballToHomeY,2));
    // console.log(`Sir, the ball should be moving to direction: ${this.ballToHomeX} y:${this.ballToHomeY} route should be equal to hipotenusa:${this.ballToHomeH}`);
    this.direction.x = this.ballToHomeX/this.ballToHomeH;
    this.direction.y = this.ballToHomeY/this.ballToHomeH;
    // console.log(`direction.x= ${this.direction.x} direction.y= ${this.direction.y}`)
    this.ballToHome = {
      x: homeX - this.position.x,
      y: homeY - this.position.y,
      h: Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    };
    // Make the ball go home faster
    this.changeDirectionSpeed = this.speed / 3;
    // Move to that position
    this.moveBall(this.changeDirectionSpeed);
  }

  // dangerColor () {
  //   setInterval()
  //   this.dangerColors = ['#FF0000', ball.colorOriginal]
  //     if (ball.position.y ) {
  //       ball.carefulColor += 1;
  //       console.log('white');
  //       ball.color = this.carefulColors[ball.carefulColor]
  //     } else if (ball.carefulColor === 1) {
  //       ball.carefulColor -= 1;
  //       console.log('red');
  //       ball.color = this.carefulColors[ball.carefulColor]
  //     }
  // }

  // _consoleLogPosition() {
  //   setInterval(function() {
  //     console.log(`The ball is in x:${this.position.x} y:${this.position.y}`);
  //   }.bind(this), 5000);
  // }
}
