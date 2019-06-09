class Tail {
  constructor (options){
    this.ctx = options.ctx;
    this.radius = options.radius;
    this.width = options.width;
    this.height = options.height;
    this.direction = options.direction;
    this.color = options.color;
    this.tailImage = new Image();
    this.tailImage.src = 'images/spriteMasterAllColors.svg';
    this.spriteWidth = 2184;
    this.spriteHeight = 16380;
    this.rows = 60;
    this.cols = 8;
    this.widthFrame = this.spriteWidth/this.cols;
    this.heightFrame = this.spriteHeight/this.rows;
    this.canvasFrameSize = this.radius*14;
    this.currentFrame = 0;
    this.spriteX = 0;
    this.spriteY = this.tailDirection(this.spriteYcolor(this.color), this.direction.x, this.direction.y); // Calls a function that assigns the direction of the tail
    this.ballX = options.ballX;
    this.ballY = options.ballY;
    this.canvasX = this.ballX - (this.radius*7); // Position X in the canvas where it should start drawing Tail frame
    this.canvasY = this.ballY - (this.radius*7); // Position Y in the canvas where it should start drawing Tail frame
    this.slowRequestAnimation = 0; //updates until frame change
  }

  
  // Assign color of the Tail
  spriteYcolor(color) {
    switch (color) {
      case '#19FFFC':
        return 0; // From 0 to 11 lines are the blue tail
      case '#7800FF':
        return 12; // From 12 to 23 lines are the purple tail
      case '#19FF2E':
        return 24; // From 24 to 35 lines are the green tail
      case '#FF0000':
        return 36; // From 36 to 47 lines are the red tail
      case '#621348':
        return 48; // From 48 to 59 lines are the enemy tail
      default:
        break;
    }
  }

  // Transform degrees to radians
  fromDegreesToRadians (degrees) {
    return degrees * Math.PI / 180;
  }  

  // Tail movement frames (same color & angle) every 4 Request Animation Frame
  updateFrameX(){
    if (this.slowRequestAnimation < 3) {
      this.slowRequestAnimation += 1; 
    } else {
      this.slowRequestAnimation = 0;
      this.currentFrame = ++this.currentFrame % this.cols;
      this.spriteX = this.currentFrame * this.widthFrame;
    }
  }
  
  // Choose angle & color of the tail realtive to ball direction
  updateFrameY(frameY, directionX, directionY){
    this.spriteY = this.tailDirection(frameY, directionX, directionY);
  }

  //=============== SIN IS HEIGHT AND COS IS WIDTH ================
  tailDirection(frameY, directionX, directionY) {
    if (directionX === 0 && directionY === 1) { // Initial tail for ball going down
      return this.spriteY = (0 + frameY) * this.widthFrame;
    } else if (directionX === 0 && directionY === -1) { // Initial tail for ball going up
      return this.spriteY = (6 + frameY) * this.widthFrame;
    } else if (directionX === 1 && directionY === 0) { // Initial tail for ball going right
      return this.spriteY = (9 + frameY) * this.widthFrame;
    } else if (directionX === -1 && directionY === 0) { // Initial tail for ball going left
      return this.spriteY = (3 + frameY) * this.widthFrame;
    } else if (directionX < 0 && directionY >= 0) { // Tail moves from 0º to 90º
      return this.firstQuarter(frameY, directionX, directionY);
    } else if (directionX <= 0 && directionY <= 0) { // Tail moves from 90º to 180º
      return this.secondQuarter(frameY, directionX, directionY);
    } else if (directionX >= 0 && directionY <= 0) { // Tail moves from 180º to 270ª
      return this.thirdQuarter(frameY, directionX, directionY);
    } else if (directionX >= 0 && directionY >= 0) { // Tail moves from 270º to 360º
      return this.forthQuarter(frameY, directionX, directionY);
    } 
  }

  firstQuarter(frameY, directionX, directionY) {
    if (directionX < Math.cos(this.fromDegreesToRadians(195)) && directionY > Math.sin(this.fromDegreesToRadians(195))) {
      return this.spriteY = (3 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(225)) && directionY > Math.sin(this.fromDegreesToRadians(225))) {
      return this.spriteY = (2 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(255)) && directionY > Math.sin(this.fromDegreesToRadians(255))) {
      return this.spriteY = (1 + frameY) * this.widthFrame;
    } else if (directionX <= Math.cos(this.fromDegreesToRadians(270)) && directionY >= Math.sin(this.fromDegreesToRadians(270))) {
      return this.spriteY = (0 + frameY) * this.widthFrame;
    } 
  }

  secondQuarter(frameY, directionX, directionY) {
    if (directionX < Math.cos(this.fromDegreesToRadians(105)) && directionY < Math.sin(this.fromDegreesToRadians(105))) {
      return this.spriteY = (6 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(135)) && directionY < Math.sin(this.fromDegreesToRadians(135))) {
      return this.spriteY = (5 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(165)) && directionY < Math.sin(this.fromDegreesToRadians(165))) {
      return this.spriteY = (4 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(180)) && directionY < Math.sin(this.fromDegreesToRadians(180))) {
      return this.spriteY = (3 + frameY) * this.widthFrame;
    }
  }

  thirdQuarter(frameY, directionX, directionY) {
    if (directionX > Math.cos(this.fromDegreesToRadians(15)) && directionY < Math.sin(this.fromDegreesToRadians(15))) {
      return this.spriteY = (9 + frameY) * this.widthFrame;
    } else if (directionX > Math.cos(this.fromDegreesToRadians(45)) && directionY < Math.sin(this.fromDegreesToRadians(45))) {
      return this.spriteY = (8 + frameY) * this.widthFrame;
    } else if (directionX > Math.cos(this.fromDegreesToRadians(75)) && directionY < Math.sin(this.fromDegreesToRadians(75))) {
      return this.spriteY = (7 + frameY) * this.widthFrame;
    } else if (directionX >= Math.cos(this.fromDegreesToRadians(90)) && directionY <= Math.sin(this.fromDegreesToRadians(90))) {
      return this.spriteY = (6 + frameY) * this.widthFrame;
    }
  }

  forthQuarter(frameY, directionX, directionY) {
    if (directionX < Math.cos(this.fromDegreesToRadians(285)) && directionY > Math.sin(this.fromDegreesToRadians(285))) {
      return this.spriteY = (0 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(315)) && directionY > Math.sin(this.fromDegreesToRadians(315))) {
      return this.spriteY =  (11 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(345)) && directionY > Math.sin(this.fromDegreesToRadians(345))) {
      return this.spriteY =  (10 + frameY) * this.widthFrame;
    } else if (directionX < Math.cos(this.fromDegreesToRadians(360)) && directionY > Math.sin(this.fromDegreesToRadians(360))) {
      return this.spriteY = (9 + frameY) * this.widthFrame;
    }
  }

  drawTail(newX, newY) {
    this.canvasX = newX - (this.radius*7); // Position X in the canvas where it should start drawing Tail frame
    this.canvasY = newY - (this.radius*7); // Position Y in the canvas where it should start drawing Tail frame
    this.ctx.drawImage(this.tailImage, this.spriteX, this.spriteY, this.widthFrame, this.heightFrame, this.canvasX, this.canvasY, this.canvasFrameSize, this.canvasFrameSize);
  }
}