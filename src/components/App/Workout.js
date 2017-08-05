import React from 'react'

import PlateCalculator from '../utility/PlateCalculator'

import { nextWorkout, prettyString } from '../../logic/core'

const Tiers = ({ workout, unit }) =>
  <div>
    {workout &&
      Object.keys(workout).map(tier =>
        <div key={tier}>
          <h1>
            {prettyString(tier)}
          </h1>
          {Object.keys(workout[tier]).map(exercise => {
            const plan = workout[tier][exercise]
            return (
              <div key={`${tier}_${exercise}`}>
                {prettyString(exercise)} - {plan.scheme}:{' '}
                {`${plan.weight}${unit}`}
              </div>
            )
          })}
        </div>
      )}
  </div>

class Workout extends React.Component {
  state = {}

  componentDidMount() {
    const { baseWorkouts } = this.props.settings
    const { nextWeights } = this.props
    const workout = nextWorkout(nextWeights, baseWorkouts[0])

    this.setState(() => ({
      workout
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
    return (
      <div>
        <Tiers workout={this.state.workout} unit={this.props.settings.unit} />
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
