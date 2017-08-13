import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import NoMatch from './NoMatch'
import SettingsPage from './SettingsPage'
import Workout from './Workout'
import defaults from '../../data/defaults'
import { startingWeights } from '../../data/examples'
import { getFirstNextWorkouts } from '../../logic/core'

import './App.css'

const Home = () =>
  <p>
    <Link to="/workout">Workout</Link>
  </p>

class App extends Component {
  state = {
    settings: {
      ...defaults
    }
  }

  componentDidMount() {
    // load in the starting weights
    // load in previous workouts
    // load in the nextWeights
    this.setState(() => ({
      nextWeights: getFirstNextWorkouts(startingWeights, defaults.progressions)
    }))
  }

  handleSettingsChange = e => {
    const t = e.target
    this.setState(state => ({
      settings: {
        ...state.settings,
        [t.name]: t.value
      }
    }))
  }

  render() {
    if (!this.state.nextWeights) return <p>Loading...</p>
    return (
      <Router>
        <div>
          <div className="container">
            <div className="columns is-mobile">
              <div className="column">
                <Link to="/">Gzclp</Link>
              </div>
              <div className="column has-text-right">
                <Link to="/settings">
                  <i className="fa fa-cog" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          <section className="container box">
            <Switch>
              <Route component={Home} path="/" exact />
              <Route
                path="/settings"
                render={props =>
                  <SettingsPage
                    {...props}
                    onSettingsChange={this.handleSettingsChange}
                    settings={this.state.settings}
                  />}
              />
              <Route
                path="/workout"
                render={props => <Workout {...props} {...this.state} />}
              />
              <Route component={NoMatch} />
            </Switch>
          </section>
          <footer className="hero-footer">
            <div className="container">
              <div className="content has-text-centered">
                <div>
                  <a
                    className="icon"
                    href="https://github.com/mattwelson/gzclp"
                  >
                    <i className="fa fa-github" />
                  </a>
                  <a className="icon" href="https://twitter.com/mattwelson">
                    <i className="fa fa-twitter" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    )
  }
}

export default App
