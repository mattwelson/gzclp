import React from 'react'

const SettingsPage = props =>
  <div>
    <h3 className="title">Settings</h3>
    <div className="field is-horizontal">
      <div className="field-label">
        <label htmlFor="unit" className="label">
          Unit
        </label>
      </div>
      <div className="field-body">
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="unit"
              onChange={props.handleSettingsChange}
            />
            &nbsp;Kg
          </label>
          <label className="radio">
            <input
              type="radio"
              name="unit"
              onChange={props.handleSettingsChange}
            />
            &nbsp;Lb
          </label>
        </div>
      </div>
    </div>
  </div>

export default SettingsPage
