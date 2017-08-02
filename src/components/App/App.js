import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import NoMatch from './NoMatch'
import SettingsPage from './SettingsPage'

import './App.css'

const Home = () => <p>Test</p>

class App extends Component {
  state = {
    settings: {
      unit: 'kg'
    }
  }

  handleSettingsChange = e => {
    console.log({ me: this, e })
  }

  render() {
    return (
      <Router>
        <div>
          <div className="container level">
            <div className="level-left">
              <Link to="">Home</Link>
            </div>
            <div className="level-right">
              <Link to="/settings">
                <i className="fa fa-cog" aria-hidden="true" />
              </Link>
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
