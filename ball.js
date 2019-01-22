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
    this.createTail();

     // Add event listener for 'Click' events over balls
    this.elem.addEventListener('click', function (event) {
      this.x = event.pageX - this.elemLeft;
      this.y = event.pageY - this.elemTop;
      this.a = this.position.x - this.x;
      this.b = this.position.y - this.y;

      // Act over a clicked ball
      if (this.clickedBall(this.a, this.b)) {
        if (this.moving === false) {
          this.moveBall(this.speed);
        } else {
          this.pauseBall();
        }
      }
    }.bind(this));
  }

  // Get random direction for the ball
  getDirection(position, maxSize) {
    if (position < 0) {
      return 1
    } else if (position > maxSize) {
      return -1
    } else {
      return 0
    }
  }

  // Check if the ball is clicked 
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

  fecundedBall(color) {
    this.pauseBall();
    this.speed = 40;
    this.moveBall(this.speed);
    console.log("Fecunded ball entering");
  }

  changeDirection(homeX, homeY) {
    this.moving = true;
    this.color = this.colorOriginal;

    // Calculate the new direction
    this.ballToHomeX = homeX - this.position.x;
    this.ballToHomeY = homeY - this.position.y;
    this.ballToHomeH = Math.sqrt(Math.pow(this.ballToHomeX,2) + Math.pow(this.ballToHomeY,2));
    this.direction.x = this.ballToHomeX/this.ballToHomeH;
    this.direction.y = this.ballToHomeY/this.ballToHomeH;
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

  createTail() {
    this.tail = new Tail({
      width: this.width, 
      height: this.height, 
      canvas: this.canvas,
      ctx: this.ctx,
      radius: this.ballRadius,
      color: this.color,
      ballX: this.position.x, 
      ballY: this.position.y,
      radius: this.radius,
      direction: this.direction
    })
  }

  // _consoleLogPosition() {
  //   setInterval(function() {
  //     console.log(`The ball is in x:${this.position.x} y:${this.position.y}`);
  //   }.bind(this), 5000);
  // }
}
