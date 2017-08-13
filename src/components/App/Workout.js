import React from 'react'

import PlateCalculator from '../utility/PlateCalculator'

import { nextWorkout, prettyString } from '../../logic/core'

const Tiers = ({ workout, unit, onOpenEdit }) =>
  <div>
    {workout &&
      Object.keys(workout).map(tier =>
        <div key={tier}>
          <div className="has-text-grey-light">
            {prettyString(tier)}
          </div>
          {Object.keys(workout[tier]).map(exercise => {
            const plan = workout[tier][exercise]
            return (
              <div key={`${tier}_${exercise}`}>
                {prettyString(exercise)} - {plan.scheme}:{' '}
                <a
                  onClick={() => onOpenEdit({ exercise, tier })}
                >{`${plan.weight}${unit}`}</a>
              </div>
            )
          })}
        </div>
      )}
  </div>

class Workout extends React.Component {
  state = { editOpen: false }

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
    const { tier, exercise } = this.state.editOpen
    const increment = increments[unit]
    const newWorkout = { ...this.state.workout }
    const weight = newWorkout[tier][exercise].weight
    newWorkout[tier][exercise].weight = weight + increment * upDown
    this.setState(() => ({
      workout: newWorkout
    }))
  }

  handleOpen = ({ exercise, tier }) =>
    this.setState(() => ({ editOpen: { exercise, tier } }))

  handleClose = () => this.setState(() => ({ editOpen: null }))

  render() {
    return (
      <div>
        <Tiers
          workout={this.state.workout}
          unit={this.props.settings.unit}
          onOpenEdit={this.handleOpen}
        />
        {this.state.editOpen &&
          <PlateCalculator
            {...this.props}
            workout={this.state.workout}
            onUpdate={this.handleUpdate}
            onClose={this.handleClose}
            {...this.state.editOpen}
          />}
      </div>
    )
  }
}

export default Workout
