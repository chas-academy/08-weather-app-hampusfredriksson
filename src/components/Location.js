import React, { Component } from 'react'

class Location extends Component {
  render() {
    return (
      <div className="weatherInfo">
        <h4>{this.props.name}</h4>
        <p>Currently: {this.props.description}</p>
        <p>Temperature: {this.props.currentTemp}°c</p>
        <p>Humidity: {this.props.humidity}%</p>

        {/* Den här vill jag ska komma från Forecast.js?!?! 
         
        { <p>{this.props.name}</p>} */}
      </div>
    )
  }
}

export default Location
