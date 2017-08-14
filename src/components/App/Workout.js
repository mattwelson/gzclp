import React from 'react'

import PlateCalculator from '../utility/PlateCalculator'
import TimerView from '../utility/TimerView'

import './Workout.css'

import {
  nextWorkout,
  prettyString,
  splitScheme,
  getGoalFromScheme
} from '../../logic/core'

const Reps = ({ reps }) =>
  <div className="column">
    <button className="button is-info">
      {reps}
    </button>
  </div>

const Excercise = ({ sets, onOpenEdit, tier, exercise, unit, miniMode }) => {
  const goal = getGoalFromScheme(splitScheme(sets.scheme))
  return (
    <div>
      <div className="is-size-5">
        {prettyString(exercise)} - {sets.scheme}:{' '}
        {miniMode ||
          <a
            className="exercise__weight"
            onClick={() => onOpenEdit({ exercise, tier })}
          >{`${sets.weight}${unit}`}</a>}
        {miniMode &&
          <strong className="exercise__weight">{`${sets.weight}${unit}`}</strong>}
      </div>
      {miniMode ||
        <div
          className={`columns is-mobile exercise__goal exercise__goal--${goal.length}`}
        >
          {goal.map((reps, i) => <Reps key={i} reps={reps} />)}
        </div>}
    </div>
  )
}

export const WorkoutTiers = ({ workout, unit, onOpenEdit, miniMode }) =>
  <div className={miniMode ? 'tiers__mini' : 'tiers'}>
    {workout &&
      Object.keys(workout).map(tier =>
        <div key={tier}>
          <div className="has-text-grey-light">
            {prettyString(tier)}
          </div>
          {Object.keys(workout[tier]).map(exercise =>
            <Excercise
              key={`${tier}_${exercise}`}
              onOpenEdit={onOpenEdit}
              tier={tier}
              exercise={exercise}
              unit={unit}
              sets={workout[tier][exercise]}
              miniMode={miniMode}
            />
          )}
        </div>
      )}
  </div>

class Workout extends React.Component {
  state = { editOpen: false, showTimer: true }

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

  handlePlateCalcClose = () => this.setState(() => ({ editOpen: null }))
  handleTimerClose = () => this.setState(() => ({ showTimer: false }))

  render() {
    return (
      <div>
        <WorkoutTiers
          workout={this.state.workout}
          unit={this.props.settings.unit}
          onOpenEdit={this.handleOpen}
        />
        {this.state.editOpen &&
          <PlateCalculator
            {...this.props}
            workout={this.state.workout}
            onUpdate={this.handleUpdate}
            onClose={this.handlePlateCalcClose}
            {...this.state.editOpen}
          />}
        {this.state.showTimer &&
          <TimerView
            rest={90}
            message="Take a break"
            dismiss={this.handleTimerClose}
          />}
      </div>
    )
  }
}

export default Workout
