class Ball {
  constructor(whith, height) {
    this.direction = 'right';
    this.position = {
      x: -10,
      y: (height / 2)
    };
    this.speed = 1;
    this.color = "blue";
    this._moveBall();
    // this._selectColor();
  }

  // start () {
  //   console.log('start');
  //   this.move();
  // }

  _moveBall () {
        // if (!this.intervalId) {
    //   this.intervalId = setInterval(this._moveForward.bind(this), 70);
    setInterval(function () {
      this.position.x += this.speed;
    }.bind(this), 10);

    // if (this.direction === 'right') {
    //   setInterval(this.position.x += this.speed, 10);
    // }
    console.log('ball moving')

    // if (!this.intervalId) {
    //   this.intervalId = setInterval(this._moveForward.bind(this), 70);
    // }
  }


  // _moveForward () {
  //   this.position.x = this.position.x +1;
  //   console.log(this.position.x)
  // }
}
