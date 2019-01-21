class Home {
  constructor(options) {
    this.position = options.position;
    this.color = options.color;
    this.radius = options.radius;
    this.elem = options.canvas;
    this.elemLeft = this.elem.offsetLeft;
    this.elemTop = this.elem.offsetTop;
    this.ctx = options.ctx;
    this.balls = options.balls;
    
     // Add event listener for 'Click' events
     this.elem.addEventListener('click', function (event) {
      this.x = event.pageX - this.elemLeft;
      this.y = event.pageY - this.elemTop;
      this.a = this.position.x - this.x;
      this.b = this.position.y - this.y;
      
      // Ball actions when home is clicked
      if (this.clickedHome(this.a, this.b)) {
        this.balls.forEach(function(ball) {
          if (ball.moving === false) {
            ball.changeDirection(this.position.x, this.position.y);
            ball.tail.updateFrameY(ball.direction.x, ball.direction.y);   
            ball.tail.tailImage.src = ball.tail.spriteSource(ball.colorOriginal);
           }
        }.bind(this))
      }}.bind(this));
  }

  // Check if the Home is clicked by using Pythagoras
  clickedHome(a,b) {
    this.h = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    if (this.h <= this.radius + 10) {
      return true
    }
  }
}
