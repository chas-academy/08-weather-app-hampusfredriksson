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
        .then(res => this.formatData(res))

      // console.log(daily)

      // let dailyForecast = []
      // for (let i = 0; i < 9; i++) {
      //   const oneData = {
      //     description: res.data.list[i].weather[0].description,
      //     time: res.data.list[i].dt_txt,
      //     temp: res.data.list[i].main.temp
      //   }
      //   dailyForecast.push(oneData)
      // }

      // let forecastFiver = []
      // for (let i = 0; i < res.data.list.length; i += 8) {
      //   let time = new Date(res.data.list[i].dt * 1000).toDateString()

      //   const data = {
      //     description: res.data.list[i].weather[0].description,
      //     temp: res.data.list[i].main.temp,
      //     time: time
      //   }

      //   console.log(res)

      //   forecastFiver.push(data)
      // }

      // this.setState({
      //   fiveForecast: forecastFiver,
      //   forecastDaily: dailyForecast
      // })
      // console.log(this.state.fiveForecast[1])
    })
  }

  getDaily = (item, index) => index < 9
  getWeekly = (item, index) => index % 8 === 0

  formatData(res) {
    const { list } = res.data
    /*
    function generateFilterFunction(operator, index) {
      return function(operator, index) {
        return `${index} ${operator}`
      }
    }

    const dailyFn = generateFilterFunction('>', 8)
    const weeklyFn = generateFilterFunction('%', 8)
*/

    let daily = list.filter(this.getDaily).map(item => {
      let timeByHour = new Date(item.dt_txt).toLocaleTimeString('sv-SE')

      return {
        description: item.weather[0].description,
        temp: item.main.temp,
        time: timeByHour,
        icon: item.weather[0].icon
      }
    })

    let weekly = list.filter(this.getWeekly).map(item => {
      let date = new Date(item.dt * 1000).toDateString()

      return {
        description: item.weather[0].description,
        temp: item.main.temp,
        time: date,
        icon: item.weather[0].icon
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
          <p>Currently: {data.description}</p>
          <p>Temperature: {data.temp}°c</p>
        </div>
      )
    })
    const fiveDaily = fiveForecast.map(data => {
      return (
        <div className="fiveForecast" key={data.dt}>
          <p>{data.time}</p>
          <p>Currently: {data.description}</p>
          <p>Temperature: {data.temp}°c</p>
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
