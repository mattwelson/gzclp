import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <section className="hero is-fullheight is-primary">
        <div className="hero-head">
          <div className="container">Head</div>
        </div>
        <div className="hero-body">
          <div className="container box">Body</div>
        </div>
        <div className="hero-foot">Foot</div>
      </section>
    )
  }
}

export default App
