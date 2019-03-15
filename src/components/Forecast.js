import React, { Component } from 'react'
import axios from 'axios'

export default class forecast extends Component {
  state = {
    fiveForecast: [],
    forecastDaily: []
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${
            position.coords.latitude
          }&lon=${
            position.coords.longitude
          }&APPID=12b7b1ce713412cd5dee7735c485b9d5&units=metric`
        )
        .then(res => {
          // console.log(res)
          let dailyForecast = []
          for (let i = 0; i < 9; i++) {
            const oneData = {
              description: res.data.list[i].weather[0].description,
              time: res.data.list[i].dt_txt,
              temp: res.data.list[i].main.temp
            }
            dailyForecast.push(oneData)
          }
          let forecastFiver = []
          for (let i = 0; i < res.data.list.length; i += 8) {
            const data = {
              description: res.data.list[i].weather[0].description,
              temp: res.data.list[i].main.temp,
              time: res.data.list[i].dt
            }
            // console.log(data.temp)

            forecastFiver.push(data)
          }

          this.setState({
            fiveForecast: forecastFiver,
            forecastDaily: dailyForecast
          })
          // console.log(this.state.fiveForecast[1])
        })
    })
  }
  render() {
    const oneDaily = this.state.forecastDaily.map(data => {
      return (
        <div className="oneDaily">
          <p>{data.time}</p>
          <p>Currently: {data.description}</p>
          <p>Temperature: {data.temp}°c</p>
        </div>
      )
    })
    const fiveDaily = this.state.fiveForecast.map(data => {
      return (
        <div className="dailyWeather">
          <p>Day: {data.time}</p>
          <p>Currently: {data.description}</p>
          <p>Temperature: {data.temp}°c</p>
        </div>
      )
    })
    return (
      <div className="weatherInfo daily">
        {oneDaily}
        <div className="weatherInfo forecast" />
        {fiveDaily}
      </div>
    )
  }
}
