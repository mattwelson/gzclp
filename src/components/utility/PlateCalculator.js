import React from 'react'

const PlateCalculator = ({ weight, settings, onUpdate }) =>
  <div className="box">
    {`${weight}${settings.unit}`}
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
