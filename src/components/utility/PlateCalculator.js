import React from 'react'

import { prettyString } from '../../logic/core'

const PlateCalculator = ({ workout, settings, onUpdate, exercise, tier }) =>
  <div className="box">
    <h3 className="title">Edit weight</h3>
    <h4 className="subtitle">
      {prettyString(tier)} {prettyString(exercise)}
    </h4>
    {`${workout[tier][exercise].weight}${settings.unit}`}
    <p className="field">
      <button className="button" onClick={() => onUpdate(-1)}>
        <span className="icon is-small">
          <i className="fa fa-minus" />
        </span>
      </button>
      <button className="button" onClick={() => onUpdate(1)}>
        <span className="icon is-small">
          <i className="fa fa-plus" />
        </span>
      </button>
    </p>
  </div>

export default PlateCalculator
