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
      rest: this.props.rest,
      isPaused: false
    }))
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  updateTimer = () => {
    const elapsed = this.state.timer.getTime()

    if (elapsed >= this.state.rest * 1000) return this.props.onComplete()

    this.setState(() => ({
      elapsed
    }))
  }

  toggleTimer = () => {
    const { isPaused, timer } = this.state
    isPaused ? timer.start() : timer.pause()
    this.setState(() => ({ isPaused: !isPaused }))
  }

  incrementRest = amount => {
    this.setState(s => ({ rest: s.rest + amount }))
  }

  render() {
    if (!this.state) return null

    const restMs = this.state.rest * 1000 // rest time in milliseconds
    const remaining = restMs - this.state.elapsed

    return (
      <div className="title timer__count">
        {formatMilliseconds(remaining)}
        <div className="timer__controls">
          <button
            className="button is-info"
            onClick={() => this.incrementRest(-30)}
          >
            -30s
          </button>
          <button className="button is-info" onClick={this.toggleTimer}>
            <span className="icon">
              {this.state.isPaused ? (
                <i className="fa fa-2x fa-play" />
              ) : (
                <i className="fa fa-2x fa-pause" />
              )}
            </span>
          </button>
          <button
            className="button is-info"
            onClick={() => this.incrementRest(30)}
          >
            +30s
          </button>
        </div>
      </div>
    )
  }
}

const TimerView = ({ rest, message, dismiss }) => (
  <div className="timer">
    <div className=" notification is-info has-text-centered">
      <button className="delete" onClick={dismiss} />
      <div className="subtitle">{message}</div>
      <TimerCountdown rest={rest} onComplete={dismiss} />
    </div>
  </div>
)

export default TimerView
