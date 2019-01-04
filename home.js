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
    // this.color = options.color;
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
            this.changeDirection();
          }
        }.bind(this))
      }}.bind(this), false);
  }

  // Check if Hipotenusa of the click to the center is equal to the radius
  clickedHome(a,b) {
    this.h = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    if (this.h <= this.radius + 10) {
      return true
    }
  }
}
