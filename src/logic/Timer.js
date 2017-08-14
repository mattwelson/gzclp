import moment from 'moment'

class Timer {
  start(start = moment()) {
    this._startTime = start
  }

  pause(now = moment()) {
    this._elapsed = this.getTime(now)
    this._startTime = null
  }

  getTime(now = moment()) {
    return this._startTime
      ? now.diff(this._startTime) + (this._elapsed || 0)
      : this._elapsed
  }

  get startTime() {
    return this._startTime
  }
}

export default Timer
