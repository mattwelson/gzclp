import React from 'react'

import { prettyString, getPlatesArray } from '../../logic/core'

const PlateDisplay = ({ plates, bar, unit }) => (
  <div className="plates">
    Plates:
    <div>
      1x Bar ({bar}
      {unit})
    </div>
    {plates.used.map(([weight, count]) => (
      <div key={`${weight}_${count}`}>
        {count}x {weight}
        {unit}
      </div>
    ))}
  </div>
)

const PlateCalculator = ({
  workout,
  settings,
  onUpdate,
  exercise,
  tier,
  onClose,
  onSettingsChange
}) => (
  <div className="modal is-active">
    <div className="modal-background" onClick={onClose} />
    <div className="modal-content">
      <div className="box">
        <h3 className="title">Edit weight</h3>
        <h4 className="subtitle">
          {prettyString(tier)} {prettyString(exercise)}
        </h4>
        <div className="level is-mobile">
          <div className="level-left">
            <h2 className="title">{`${workout[tier][exercise]
              .weight}${settings.unit}`}</h2>
          </div>
          <div className="level-right">
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
        </div>
        <div className="box">
          <PlateDisplay
            plates={getPlatesArray(
              workout[tier][exercise].weight,
              settings.unit
            )}
            bar={settings.bars[settings.unit]}
            unit={settings.unit}
          />
        </div>
      </div>
    </div>
    <button className="modal-close is-large" onClick={onClose} />
  </div>
)

export default PlateCalculator
