import React, { Component } from 'react'
import axios from 'axios'

export default class forecast extends Component {
  state = {}

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      axios

        .get(
          `https://api.darksky.net/forecast/7cb310467ebebddaa6546a3bbf3b2451/${
            position.coords.latitude
          },${position.coords.longitude}`
        )
        .then(res => {
          // let weatherControll = res.data.list.filter(data => {
          //   let weatherDuringDay = ['12', '15', '18']
          //   // data.map(day => {
          //   //   console.log(data)
          //   // })
          //   if (weatherDuringDay.includes(data.dt_txt.substring(11, 13))) {
          //     return data
          //   }
          // })
          console.log(res)

          this.setState({
            currentCity: res.data.city.name,
            currentWeather: res.data.list[0].weather[0].description,
            currentTemp: res.data.list[0].main.temp,
            currentTempMin: res.data.list[0].main.temp_min,
            currentTempMax: res.data.list[0].main.temp_max,
            currentClouds: res.data.list[0].wind.speed,
            currentIcon: res.data.list[0].weather[0].icon
          })
        })
    })
  }
  render() {
    return (
      <div className="location">
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLocation}>
          WHERE YOU AT BOI
        </button>
        {
          <div className="currentLocation">
            {/* <img src={dynIcon} /> */}
            <p>City: {this.state.currentCity}</p>
            <p>Current weather: {this.state.currentWeather}</p>
            <p>Temperature: {this.state.currentTemp}°C</p>
            <p>
              High/Low: {this.state.currentTempMax} /{' '}
              {this.state.currentTempMin}°C
            </p>
            <p>Finally, this windy: {this.state.currentClouds} km/h</p>

            {/* <div className='weeklyForecast' key={forecastDay.time} /> */}
          </div>
        }
      </div>
    )
  }
}
