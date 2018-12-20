class Game {
  constructor(options){ 
    this.scene = options.scene;
    this.width = options.width;
    this.height = options.height;
    this.ctx = options.ctx
    this.ball = new Ball(this.width, this.height);
  }

  startGame() {
    this._update();
    // this.ball.start();
    // Set interval irá aquí
    // this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
  
  _drawBoard() {
    this.ctx.fillStyle = "#FBFFF8";
    // this.ctx.fillRect(0,0, this.ball.position.x, this.ball.position.y);
  }

  _drawBalls() {
    // Hacer un loop ForEach cuando tengas más de una bola (hacer un array de bolas)
    this.ctx.beginPath();
    this.ctx.arc(this.ball.position.x,this.ball.position.y,30,0,2*Math.PI);
    this.ctx.arc.fillStyle = 'blue';
    this.ctx.stroke();
  }

  _clear() {
    // console.log(`the canvas width is ${this.width} and height is ${height}`)
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  _update() {
    this._clear();
    this._drawBoard();
    this._drawBalls();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}