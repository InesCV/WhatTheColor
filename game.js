class Game {
  constructor(options) {
    this.ball = new Ball;
    this.position = {
      x: 0,
      y: 0
    }
    this.ctx = options.ctx;
  }

  startGame() {
    this._update();
    this.ball.start();
    // Set interval irá aquí
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
  
  _drawBoard() {
    this.ctx.fillStyle = "#FBFFF8";
    this.ctx.fillRect(0,0, this.position.x * 10, this.position.y * 10);
  }

  _drawBall() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'blue';
    this.ctx.arc(100,75,50,0,2*Math.PI);
    this.ctx.stroke();
    // this.ctx.fillRect(position.column * 10, position.row * 10, 8, 8);
  }


  clear() {
    this.ctx.clearRect(0, 0, this.position.x * 10, this.position.y * 10);
  }
  _update() {
    this.clear();
    this._drawBoard();
    this._drawBall();
    if (this.intervalGame !== undefined) {
      this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    } 
  }
}