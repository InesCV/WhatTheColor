class Home {
  constructor(options) {
    this.position = {
      x: options.width,
      y: 0
    };
    this.goToPosition = {
      x: this.position.x - (this.radius / 2),
      y: this.position.y + (this.radius / 2)
    }
    // this.color = getColor();
    this.radius = options.height/4;
    this.elem = options.canvas;
    this.elemLeft = this.elem.offsetLeft;
    this.elemTop = this.elem.offsetTop;
    this.ctx = options.ctx;
    this.balls = options.balls;
    console.log(this.balls)
    
     // Add event listener for 'Click' events
     this.elem.addEventListener('click', function (event) {
      this.x = event.pageX - this.elemLeft;
      this.y = event.pageY - this.elemTop;
      console.log (`HOME: I clicked exactly x:${this.x} y:${this.y}`)
      this.a = this.position.x - this.x;
      this.b = this.position.y - this.y;
      console.log(`HOME: distances a ${this.a} and b ${this.b}`)
      // Check if the ball is clicked
      if (this._clickedHome(this.a, this.b)) {
        console.log(`HOME: clicked a FUCKING home in x:${this.x} y:${this.y}`);
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

  _clickedHome(a,b) {
    this.h = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    console.log(`HOME: La hipotenusa es ${this.h}`)
    if (this.h <= this.radius + 10) {
      return true
    }
  }



}
