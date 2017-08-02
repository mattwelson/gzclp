import React from 'react'

const NoMatch = ({ location }) =>
  <div className="error--404 has-text-centered">
    <h1 className="title is-1">404</h1>
    <h2 className="subtitle is-2">Page not found</h2>
    <p>The page you were looking for does not exist!</p>
  </div>

export default NoMatch
