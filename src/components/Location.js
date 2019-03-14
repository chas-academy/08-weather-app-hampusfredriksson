import React, { Component } from 'react'

class Location extends Component {
  render() {
    return (
      <div className="currentLocation">
        <p>{this.props.res}</p>
        <p>{this.props.description}</p>
        <p>{this.props.currentTemp} C</p>
        <p>{this.props.humidity}%</p>

        {/* Den här vill jag ska komma från Forecast.js?!?! 
         
        { <p>{this.props.name}</p>} */}
      </div>
    )
  }
}

export default Location
