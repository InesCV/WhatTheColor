class Game {
  constructor(options) {
    this.ball = new Ball 
    // (0, canvas.height/2, 'right');
    // this.scene = {
    //   x: canvas.width,
    //   y: canvas.height
    // }
    // this.scene = undefined;
    this.ctx = options.ctx;
  }

  startGame() {
    this._update();
    // this.ball.start();
    // Set interval irá aquí
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
  
  _drawBoard() {
    this.ctx.fillStyle = "#FBFFF8";
    // this.ctx.fillRect(0,0, this.ball.position.x, this.ball.position.y);
  }

  _drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.ball.position.x,this.ball.position.y,30,0,2*Math.PI);
    this.ctx.fillStyle = 'blue';
    this.ctx.stroke();
    // this.ctx.fillRect(position.column * 10, position.row * 10, 8, 8);
  }

  _moveBall () {
    if (this.ball.direction === 'right') {
      this.ball.position.x += this.ball.speed;
    }
    // if (!this.intervalId) {
    //   this.intervalId = setInterval(this._moveForward.bind(this), 70);
    // }
  }

  clear() {
    this.ctx.clearRect(0, 0, 800, 400);
  }
  _update() {
    this.clear();
    this._drawBoard();
    this._drawBall();
    this._moveBall();
    if (this.intervalGame !== undefined) {
      this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    } 
  }
}