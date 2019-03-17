import React, { Component } from 'react'
import axios from 'axios'
import WeatherIcon from 'react-icons-weather'

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
        .then(res => this.formatData(res))
    })
  }
  getDaily = (item, index) => index < 9
  getWeekly = (item, index) => index % 8 === 0

  formatData(res) {
    const { list } = res.data

    let daily = list.filter(this.getDaily).map(item => {
      let timeByHour = new Date(item.dt_txt).toLocaleTimeString('sv-SE')

      return {
        description: item.weather[0].description,
        temp: item.main.temp,
        time: timeByHour,
        icon: item.weather[0].id
      }
    })

    let weekly = list.filter(this.getWeekly).map(item => {
      let date = new Date(item.dt * 1000).toDateString()

      return {
        description: item.weather[0].description,
        temp: item.main.temp,
        time: date,
        icon: item.weather[0].id
      }
    })

    this.setState({
      fiveForecast: weekly,
      forecastDaily: daily
    })
  }

  render() {
    const { forecastDaily, fiveForecast } = this.state

    const oneDaily = forecastDaily.map(data => {
      return (
        <div className="weatherInfo" key={data.dt}>
          <p>{data.time}</p>
          <p>{data.description}</p>
          <div>
            <WeatherIcon
              className="owm"
              name="owm"
              iconId={data.icon}
              flip="horizontal"
              rotate="90"
            />
          </div>
          <p>
            Temperature: {data.temp.toFixed()}℃ <br />
          </p>
        </div>
      )
    })
    const fiveDaily = fiveForecast.map(data => {
      return (
        <div className="fiveForecast" key={data.dt}>
          <p>{data.time}</p>
          <p>{data.description}</p>
          <div>
            <WeatherIcon
              className="owm"
              name="owm"
              iconId={data.icon}
              flip="horizontal"
              rotate="90"
            />
          </div>
          <p>
            Temperature: {data.temp.toFixed()}℃ <br />
          </p>
        </div>
      )
    })
    return (
      <div className="wrapper">
        <div className="oneDaily">{oneDaily}</div>
        <div className="forecast">{fiveDaily}</div>
      </div>
    )
  }
}
