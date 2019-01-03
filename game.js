class Game {
  constructor(options){ 
    this.width = options.width;
    this.height = options.height;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
    this.balls = [];
    this.homes = []
    this.generateBalls();
    this.generateHomes();
    this._startBallCreation();
    // this.ball = new Ball({
    //   width: this.width, 
    //   height: this.height, 
    //   canvas: this.canvas,
    //   ctx: this.ctx
    // });
  }

  startGame() {
    this._update();
    // this.ball.start();
    // Set interval irá aquí
    // this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

    ////// GENERATE BALLS & HOMES ///////

  _startBallCreation() {
    setInterval(function() {
      this.generateBalls();
    }.bind(this), 5000);
  }

  generateBalls() {
    this.balls.push(new Ball({
      width: this.width, 
      height: this.height, 
      canvas: this.canvas,
      ctx: this.ctx,
      homes: this.homes
    }));
  }

  generateHomes() {
    this.homes.push(new Home({
      width: this.width, 
      height: this.height, 
      canvas: this.canvas,
      ctx: this.ctx,
      balls: this.balls
    }));
  }
  

   ////// DRAW STUFF ///////

  
  _drawBoard() {
    this.ctx.fillStyle = "#FBFFF8";
    // this.ctx.fillRect(0,0, this.ball.position.x, this.ball.position.y);
  }

  _drawBalls() {
    this.balls.forEach(function(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.position.x,ball.position.y,ball.radius,0,2*Math.PI);
      this.ctx.fillStyle = '#19FFFC';
      this.ctx.fill();
    }.bind(this))
    // Hacer un loop ForEach cuando tengas más de una bola (hacer un array de bolas)
    
    // this.ctx.stroke();
  }

  _drawHomes() {
    // Hacer un loop ForEach cuando tengas más de una bola (hacer un array de casas)
    this.ctx.beginPath();
    this.ctx.arc(this.homes[0].position.x,this.homes[0].position.y,this.homes[0].radius,0,2*Math.PI);
    this.ctx.arc(0,this.height,this.height/4,0,2*Math.PI);
    this.ctx.fillStyle = '#19FFFC';
    // this.ctx.fillStyle = '#19FF2E';
    this.ctx.fill();
    // this.ctx.stroke();
  }

  _clear() {
    // console.log(`the canvas width is ${this.width} and height is ${height}`)
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  getRandomNumber(items) {
    Math.floor(Math.random()*items)
  }



  // _sayLocation() {
  //   //Create elem
  //   let elem = this.canvas;
  //   let elemLeft = elem.offsetLeft; // devuelve el número de píxeles a la izquierda del elemento actual con respecto al nodo HTMLElement.offsetParent
  //   let elemTop = elem.offsetTop; // retorna la distancia del elemento actual respecto al borde superior del nodo offsetParent
  //   let context = this.ctx;
  //   let elements = [];

  //   // Add event listener for 'Click' events
  //   elem.addEventListener('click', function (event) {
  //     let x = event.pageX - elemLeft;
  //     let y = event.pageY - elemTop;
  //     console.log (`I clicked exactly x:${x} y:${y}`)

  //     // Collision detection between clicked offset and element
  //     elements.forEach(function(element) {
  //       if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
  //         alert('clicked an element');
  //         console.log(`I clicked a FUCKING ELEMENT x:${x} y:${y}`)
  //       }
  //     });
  //   }, false);

  //   // Add element in the array of elements
  //   elements.push({
  //     color: '#05EFFF',
  //     width: 150,
  //     height: 100,
  //     top: 20,
  //     left: 15
  //   });

  // //   // // Render elements
  // //   // elements.forEach(function(element) {
  // //   //   context.fillStyle = element.color;
  // //   //   context.fillRect = (element.left, element.top, element.width, element.height)
  // //   // })
  // }





  _update() {
    this._clear();
    this._drawBoard();
    this._drawBalls();
    this._drawHomes();
    // this._sayLocation();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}