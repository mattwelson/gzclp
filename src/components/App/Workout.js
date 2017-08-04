import React from 'react'

import PlateCalculator from '../utility/PlateCalculator'

class Workout extends React.Component {
  state = {}

  componentDidMount() {
    this.setState(() => ({
      weight: 50
    }))
  }

  // upDown is a positive or negative int, 1 or -1
  handleUpdate = upDown => {
    const { increments, unit } = this.props.settings
    const increment = increments[unit]
    this.setState(s => ({
      weight: s.weight + increment * upDown
    }))
  }

  render() {
    const { baseWorkouts, progressions, prettyText, unit } = this.props.settings
    return (
      <div>
        <h1>Tier 1</h1>
        <p>
          {baseWorkouts[0]['tier1'].map((x, i) =>
            <span key={`${x}_${i}`}>
              {prettyText[x] || x} - {progressions['tier1'][0]}:{' '}
              {`${this.state.weight}${unit}`}
            </span>
          )}
        </p>
        <PlateCalculator
          {...this.props}
          weight={this.state.weight}
          onUpdate={this.handleUpdate}
        />
      </div>
    )
  }
}

export default Workout
