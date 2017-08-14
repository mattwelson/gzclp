import React from 'react'

import Timer from '../../logic/Timer'
import { formatMilliseconds } from '../../logic/core'
import './TimerView.css'

class TimerCountdown extends React.Component {
  componentDidMount() {
    const timer = new Timer()
    const interval = setInterval(this.updateTimer, 200)

    timer.start()
    this.setState(() => ({
      timer: timer,
      interval: interval,
      elapsed: 0,
      rest: this.props.rest
    }))
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  updateTimer = () => {
    const elapsed = this.state.timer.getTime()

    if (elapsed >= this.props.rest * 1000) return this.props.onComplete()

    this.setState(() => ({
      elapsed
    }))
  }

  render() {
    if (!this.state) return null

    const restMs = this.props.rest * 1000 // rest time in milliseconds
    const remaining = restMs - this.state.elapsed

    return (
      <div className="title timer__count">
        {formatMilliseconds(remaining)}
        <div className="timer__controls">
          <button className="button is-info">-30s</button>
          <button className="button is-info">
            <span className="icon">
              <i className="fa fa-pause" />
            </span>
          </button>
          <button className="button is-info">+30s</button>
        </div>
      </div>
    )
  }
}

const TimerView = ({ rest, message, dismiss }) =>
  <div className="timer">
    <div className=" notification is-info has-text-centered">
      <button className="delete" onClick={dismiss} />
      <div className="subtitle">
        {message}
      </div>
      <TimerCountdown rest={rest} onComplete={dismiss} />
    </div>
  </div>

export default TimerView
