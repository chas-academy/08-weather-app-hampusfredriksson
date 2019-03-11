import React, { Component } from 'react'
// import axois from 'axios'
// import { Route, Switch } from 'react-router-dom'
import Location from './Location'

class Home extends Component {
  state = {}
  render() {
    return (
      <div>
        <nav className='nav-wrapper'>
          <div className='container'>Check Weathur</div>
          <br />
        </nav>
        <div>
          <Location />
        </div>
      </div>
    )
  }
}
export default Home
