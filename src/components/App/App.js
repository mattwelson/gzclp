import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import NoMatch from './NoMatch'
import SettingsPage from './SettingsPage'
import defaults from '../../data/defaults.yml'

import './App.css'

const Home = () => <p>Test</p>

class App extends Component {
  state = {
    settings: {
      unit: 'kg',
      increment: {
        kg: 2.5,
        lb: 5
      },
      bar: {
        kg: 20,
        lb: 45
      },
      baseWorkouts: []
    },
    defaults
  }

  handleSettingsChange = e => {
    console.log({ me: this, e })
  }

  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <div className="columns is-mobile">
              <div className="column">
                <Link to="">Home</Link>
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
