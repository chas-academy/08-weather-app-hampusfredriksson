import React, { Component } from 'react'
import axios from 'axios'

export default class forecast extends Component {
  state = {
    fiveForecast: []
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      axios
        .get(
          // `https://api.darksky.net/forecast/7cb310467ebebddaa6546a3bbf3b2451/${
          //   position.coords.latitude
          // },${position.coords.longitude}`
          `https://api.openweathermap.org/data/2.5/forecast?lat=${
            position.coords.latitude
          }&lon=${
            position.coords.longitude
          }&APPID=12b7b1ce713412cd5dee7735c485b9d5&units=metric`
        )
        .then(res => {
          // console.log(res)
          let forecastFiver = []
          for (let i = 0; i < res.data.list.length; i += 8) {
            const data = {
              dataName: res.data.list[i].dt_txt,
              description: res.data.list[i].weather[0].description,
              temp: res.data.list[i].main.temp
            }

            forecastFiver.push(data)
          }

          this.setState({
            fiveForecast: forecastFiver
          })
          // console.log(this.state.fiveForecast[0].dataName)
          // console.log(this.state.fiveForecast[0].description)
          // console.log(this.state.fiveForecast[0].temp)
        })
    })
  }
  render() {
    const fiveDaily = this.state.fiveForecast.map(daily => {
      return (
        <div>
          <h3>{daily.dataName}</h3>
          <h3>{daily.description}</h3>
          <h3>{daily.temp}</h3>
        </div>
      )
    })
    return (
      <div className="forecast">
        <p>//test </p>
        {fiveDaily}
      </div>
    )
  }
}
