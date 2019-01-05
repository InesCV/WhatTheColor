class Home {
  constructor(options) {
    this.position = options.position;
    // Destination position of the home (to make it easier)
    // this.goToPosition = {
    //   x: goToPosition(this.position.x, this.radius),
    //   y: goToPosition(this.position.y, this.radius)
    // }
    // console.log(`Go to position x:${this.goToPosition.x} y: ${this.goToPosition.y}`)
    this.color = options.color;
    this.radius = options.height/4;
    this.elem = options.canvas;
    this.elemLeft = this.elem.offsetLeft;
    this.elemTop = this.elem.offsetTop;
    this.ctx = options.ctx;
    this.balls = options.balls;
    
     // Add event listener for 'Click' events
     this.elem.addEventListener('click', function (event) {
      this.x = event.pageX - this.elemLeft;
      this.y = event.pageY - this.elemTop;
      // console.log (`HOME: I clicked exactly x:${this.x} y:${this.y}`)
      this.a = this.position.x - this.x;
      this.b = this.position.y - this.y;
      
      // Check if the ball is clicked
      if (this.clickedHome(this.a, this.b)) {
        console.log(`HOME: clicked a FUCKING home in x:${this.x} y:${this.y}`);
        this.balls.forEach(function(ball) {
          if (ball.speed === 0) {
            ball.changeDirection(this.position.x, this.position.y);
          }
        }.bind(this))
      }}.bind(this), false);
  }

  goToPosition(center, radius) {
    if (center === 0) {
      return center + (radius/2)
    } else {
      return center - (radius/2)
    }
  }

  // Check if Hipotenusa of the click to the center is equal to the radius
  clickedHome(a,b) {
    this.h = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    if (this.h <= this.radius + 10) {
      return true
    }
  }
}
