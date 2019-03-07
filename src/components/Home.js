import React, { Component } from 'react'
// import axois from 'axios'
// import { Route, Switch } from 'react-router-dom'
import Location from './Location'

class Home extends Component {
  state = {}
  render() {
    return (
      <nav className='nav-wrapper'>
        <div className='container'>Check Weathur</div>
        <br />
        <Location />
        {/* <Weather /> */}
      </nav>
    )
  }
}
export default Home
