import React, { Component } from 'react'
import axios from 'axios'
import Location from './Location'

class Weather extends Component {
  state = {
    weather: this.state.lat
  }
  // APIKEY = '12b7b1ce713412cd5dee7735c485b9d5'

  // getWeather = () => {
  // axios
  //   .get(
  //     `https://api.openweathermap.org/data/2.5/forecast?lat=${
  //       this.state.lat
  //     }&lon=${this.state.lat}&APPID=12b7b1ce713412cd5dee7735c485b9d5`
  //   )
  //   .then(res => {
  //     console.log(res)
  //   })
  // }

  render() {
    return (
      <div>
        <div className='weather'>
          {/* <button onClick={this.getWeather}>Get weathur</button> */}
        </div>
      </div>
    )
  }
  // API KEY FROM OpenWeatherMap
  baseURL = '12b7b1ce713412cd5dee7735c485b9d5'
}

export default Weather
