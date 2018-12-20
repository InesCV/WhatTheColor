class Ball {
  constructor(maxRows, maxColumns) {
    this.direction = 'right';
    this.intervalId = undefined;
    this.position = {
      x: 0,
      y: 0
    };
  }

  start () {
    console.log('start');
    this.move();
  }

  move () {
    if (!this.intervalId) {
      this.intervalId = setInterval(this._moveForward.bind(this), 70);
    }
  }

  _moveForward () {
    this.position.x = this.position.x +1;
    console.log(this.position.x)
  }
}
