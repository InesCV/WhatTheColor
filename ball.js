class Ball {
  constructor(options) {
    console.log(options)
    this.direction = 'right';
    this.position = {
      x: -10,
      y: (options.height / 2)
    };
    this.speed = 1;
    this.color = "blue";
    this.radius = 30;
    // this._selectColor();
    this._moveBall();
    this._consoleLogPosition();
    // this._clickedBall();
    this.elem = options.canvas;
    this.elemLeft = this.elem.offsetLeft;
    this.elemTop = this.elem.offsetTop;
    this.ctx = options.ctx;
    
     // Add event listener for 'Click' events
     this.elem.addEventListener('click', function (event) {
      this.x = event.pageX - this.elemLeft;
      this.y = event.pageY - this.elemTop;
      console.log (`I clicked exactly x:${this.x} y:${this.y}`)
      this.a = this.position.x - this.x;
      this.b = this.position.y - this.y;
      console.log(`distances a ${this.a} and b ${this.b}`)
      // Check if the ball is clicked
      if (this._clickedBall(this.a, this.b)) {
        console.log(`I clicked a FUCKING ball in x:${this.x} y:${this.y}`);
        console.log(this.speed)
        if (this.speed === 0) {
          this._moveBall();
        } else {
          this._pauseBall();
        }
      }}.bind(this), false);
  
    //   // Collision detection between clicked offset and element
    //   this.balls.forEach(function(ball) {
    //     if (y > ball.top && y < ball.top + ball.radius && x > ball.left && x < ball.left + ball.radius) {
    //       alert('clicked a ball');
    //       console.log(`I clicked a FUCKING ball x:${x} y:${y}`)
    //     }
    //   });
    // }.bind(this), false);

    //   // Collision detection between clicked offset and element
    //   this.balls.forEach(function(ball) {
    //     if (y > ball.top && y < ball.top + ball.radius && x > ball.left && x < ball.left + ball.radius) {
    //       alert('clicked a ball');
    //       console.log(`I clicked a FUCKING ball x:${x} y:${y}`)
    //     }
    //   });
    // }, false);

}

  _clickedBall(a,b) {
    this.h = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    console.log(`La hipotenusa es ${this.h}`)
    if (this.h <= this.radius + 10) {
      return true
    }
  }

  _moveBall() {
    this.speed = 1;
        // if (!this.intervalId) {
    //   this.intervalId = setInterval(this._moveForward.bind(this), 70);
    setInterval(function () {
      this.position.x += this.speed;
    }.bind(this), 20);
    // if (this.direction === 'right') {
    //   setInterval(this.position.x += this.speed, 10);
    // }

  }

  _pauseBall() {
    this.speed = 0;
  }

  _consoleLogPosition() {
    setInterval(function() {
      console.log(`The ball is in x:${this.position.x} y:${this.position.y}`);
    }.bind(this), 5000);
  }
  
  // _clickedBall() {
  //   // Add event listener for 'Click' events
  //   this.elem.addEventListener('click', function (event) {
  //     this.x = event.pageX - this.elemLeft;
  //     this.y = event.pageY - this.elemTop;
  //     console.log (`I clicked exactly x:${this.x} y:${this.y}`)

  //     // Collision detection between clicked offset and element
  //     this.Game.balls.forEach(function(ball) {
  //       if (y > ball.top && y < ball.top + ball.height && x > ball.left && x < ball.left + ball.width) {
  //         alert('clicked a ball');
  //         console.log(`I clicked a FUCKING ball x:${x} y:${y}`)
  //       }
  //     });
  //   }, false);
  // }

  // _moveForward () {
  //   this.position.x = this.position.x +1;
  //   console.log(this.position.x)
  // }

  // _sayLocation() {

  // }
}
