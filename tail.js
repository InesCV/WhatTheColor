class Tail {
  constructor (options){
    this.ctx = options.ctx;
    this.radius = options.radius;
    this.width = options.width;
    this.height = options.height;
    this.direction = options.direction;
    this.color = options.color;
    this.tailImage = new Image();
    this.tailImage.src = this.spriteSource(this.color);
    this.spriteWidth = 3360;
    this.spriteHeight = 5040;
    this.rows = 12;
    this.cols = 8;
    this.widthFrame = this.spriteWidth/this.cols;
    this.heightFrame = this.spriteHeight/this.rows;
    this.canvasFrameSize = this.radius*14;
    this.currentFrame = 0;
    this.spriteX = 0;
    this.spriteY = this.tailDirection(this.direction.x, this.direction.y); // Calls a function that assigns the direction of the tail
    this.ballX = options.ballX;
    this.ballY = options.ballY;
    this.canvasX = this.ballX - (this.radius*7); // Position X in the canvas where it should start drawing Tail frame
    this.canvasY = this.ballY - (this.radius*7); // Position Y in the canvas where it should start drawing Tail frame
    this.slowRequestAnimation = 0; //updates until frame change
  }

  // Assign color of the Tail
  spriteSource(color) {
    if (color === '#19FFFC') {
      return 'images/blueSprite.png';
    } else if (color === '#7800FF') {
      return 'images/purpleSprite.png';
    } else if (color === '#19FF2E') {
      return 'images/greenSprite.png';
    } else if (color === '#621348') {
      return 'images/enemySprite.png';
    } 
  }

  fromDegreesToRadians (degrees) {
    return degrees * Math.PI / 180;
  }  

  // Movement of the ball frames in the same angle
  updateFrameX(){
    if (this.slowRequestAnimation < 3) {
      this.slowRequestAnimation += 1;
    } else {
      this.slowRequestAnimation = 0;
      this.currentFrame = ++this.currentFrame % this.cols;
      this.spriteX = this.currentFrame * this.widthFrame;
    }
  }
  
  // Choose angle of the tail realtive to ball direction
  updateFrameY(directionX, directionY){
    this.spriteY = this.tailDirection(directionX, directionY);
  }

  //=============== SIN IS HEIGHT AND COS IS WIDTH ================
  tailDirection(directionX, directionY) {
    if (directionX === 0 && directionY === 1) { // Initial tail for ball going down
      return this.spriteY = 0 * this.widthFrame;
    } else if (directionX === 0 && directionY === -1) { // Initial tail for ball going up
      return this.spriteY = 6 * this.widthFrame;
    } else if (directionX === 1 && directionY === 0) { // Initial tail for ball going right
      return this.spriteY = 9 * this.widthFrame;
    } else if (directionX === -1 && directionY === 0) { // Initial tail for ball going left
      return this.spriteY = 3 * this.widthFrame;
    } else if (directionX < 0 && directionY >= 0) { // Tail moves from 0º to 90º
      return this.firstQuarter(directionX, directionY);
    } else if (directionX <= 0 && directionY <= 0) { // Tail moves from 90º to 180º
      return this.secondQuarter(directionX, directionY);
    } else if (directionX >= 0 && directionY <= 0) { // Tail moves from 180º to 270ª
      return this.thirdQuarter(directionX, directionY);
    } else if (directionX >= 0 && directionY >= 0) { // Tail moves from 270º to 360º
      return this.forthQuarter(directionX, directionY);
    } 
  }

  firstQuarter(directionX, directionY) {
    if (directionX < Math.cos(this.fromDegreesToRadians(195)) && directionY > Math.sin(this.fromDegreesToRadians(195))) {
      return this.spriteY = 3 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(225)) && directionY > Math.sin(this.fromDegreesToRadians(225))) {
      return this.spriteY = 2 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(255)) && directionY > Math.sin(this.fromDegreesToRadians(255))) {
      return this.spriteY = 1 * this.widthFrame;
    } else if (directionX <= Math.cos(this.fromDegreesToRadians(270)) && directionY >= Math.sin(this.fromDegreesToRadians(270))) {
      return this.spriteY = 0 * this.widthFrame;
    } 
  }

  secondQuarter(directionX, directionY) {
    if (directionX < Math.cos(this.fromDegreesToRadians(105)) && directionY < Math.sin(this.fromDegreesToRadians(105))) {
      return this.spriteY = 6 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(135)) && directionY < Math.sin(this.fromDegreesToRadians(135))) {
      return this.spriteY = 5 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(165)) && directionY < Math.sin(this.fromDegreesToRadians(165))) {
      return this.spriteY = 4 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(180)) && directionY < Math.sin(this.fromDegreesToRadians(180))) {
      return this.spriteY = 3 * this.widthFrame;
    }
  }

  thirdQuarter(directionX, directionY) {
    if (directionX > Math.cos(this.fromDegreesToRadians(15)) && directionY < Math.sin(this.fromDegreesToRadians(15))) {
      return this.spriteY = 9 * this.widthFrame;
    } else if (directionX > Math.cos(this.fromDegreesToRadians(45)) && directionY < Math.sin(this.fromDegreesToRadians(45))) {
      return this.spriteY = 8 * this.widthFrame;
    } else if (directionX > Math.cos(this.fromDegreesToRadians(75)) && directionY < Math.sin(this.fromDegreesToRadians(75))) {
      return this.spriteY = 7 * this.widthFrame;
    } else if (directionX >= Math.cos(this.fromDegreesToRadians(90)) && directionY <= Math.sin(this.fromDegreesToRadians(90))) {
      return this.spriteY = 6 * this.widthFrame;
    }
  }

  forthQuarter(directionX, directionY) {
    if (directionX < Math.cos(this.fromDegreesToRadians(285)) && directionY > Math.sin(this.fromDegreesToRadians(285))) {
      return this.spriteY = 0 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(315)) && directionY > Math.sin(this.fromDegreesToRadians(315))) {
      return this.spriteY = 11 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(345)) && directionY > Math.sin(this.fromDegreesToRadians(345))) {
      return this.spriteY = 10 * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(360)) && directionY > Math.sin(this.fromDegreesToRadians(360))) {
      return this.spriteY = 9 * this.widthFrame;
    }
  }

  drawTail(newX, newY) {
    this.canvasX = newX - (this.radius*7); // Position X in the canvas where it should start drawing Tail frame
    this.canvasY = newY - (this.radius*7); // Position Y in the canvas where it should start drawing Tail frame
    this.ctx.drawImage(this.tailImage, this.spriteX, this.spriteY, this.widthFrame, this.heightFrame, this.canvasX, this.canvasY, this.canvasFrameSize, this.canvasFrameSize);
  }
}