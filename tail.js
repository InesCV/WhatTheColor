class Tail {
  constructor (options){
    this.ctx = options.ctx;
    this.radius = options.radius;
    this.width = options.width;
    this.height = options.height;
    this.tail = new Image();
    this.tail.src = 'images/blueSprite.png';
    this.spriteWidth = 2100;
    this.spriteHeight = 5040;
    this.rows = 12;
    this.cols = 5;
    this.widthFrame = this.spriteWidth/this.cols;
    this.heightFrame = this.spriteHeight/this.rows;
    this.canvasFrameSize = this.radius*14;
    this.currentFrame = 0;
    this.frameCount = 5;
    this.spriteX = 0;
    this.spriteY = 0;
    this.ballX = options.ballX;
    this.ballY = options.ballY;
    // this.canvasX = this.width/2; // Position X in the canvas where it should start drawing Tail frame
    // this.canvasY = this.height/2; // Position Y in the canvas where it should start drawing Tail frame
    this.canvasX = this.ballX - 210; // Position X in the canvas where it should start drawing Tail frame
    this.canvasY = this.ballY - 210; // Position Y in the canvas where it should start drawing Tail frame
    // this._drawInterval();
  }

  checkBallPosition() {
    this.ballX = this.Ball.position.x;
  }

  _updateFrame(){
    // this.ctx.clearRect(this.spriteX, this.spriteY, this.widthFrame, this.heightFrame);
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.canvasX = this.currentFrame * this.widthFrame;
  }

  drawTail() {
    this._updateFrame();
    this.ctx.drawImage(this.tail, this.canvasX, this.canvasY,  this.canvasFrameSize, this.canvasFrameSize, this.spriteX, this.spriteY, this.widthFrame, this.heightFrame);
    // console.log()
  }

  _drawInterval() {
    this.intervalIDTail = setInterval(function() {
      this._drawTail
    }, 500);
  }
}