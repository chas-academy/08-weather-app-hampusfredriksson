import React, { Component } from 'react'
import axios from 'axios'

class Location extends Component {
  state = {
    lat: null,
    lon: null,
    city: [],
    currentCity: [],
    currentWeather: [],
    currentTemp: [],
    currentTempMin: [],
    currentTempMax: [],
    currentWeather: [],
    currentClouds: [],
    currentIcon: [],
    weeklyWeather: []
    // forecastArray: [],
    // weeklyTemp: [],
    // weeklyTempMin: [],
    // weeklyTempMax: [],
    // weeklyWeather: [],
    // weeklyClouds: [],
    // weeklyIcon: []
  }
  getLocation = () => {
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
          let weatherControll = res.data.list.filter(data => {
            let weatherDuringDay = ['12', '15', '18']
            // data.map(day => {
            //   console.log(data)
            // })
            if (weatherDuringDay.includes(data.dt_txt.substring(11, 13))) {
              return data
            }

            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                // console.log(key, data[key])
              }
            }
            let newDataArray = Object.values(data)

            console.log(Object.entries(data))
          })

          this.setState({
            currentCity: res.data.city.name,
            currentWeather: res.data.list[0].weather[0].description,
            currentTemp: res.data.list[0].main.temp,
            currentTempMin: res.data.list[0].main.temp_min,
            currentTempMax: res.data.list[0].main.temp_max,
            currentClouds: res.data.list[0].wind.speed,
            currentIcon: res.data.list[0].weather[0].icon
            // currentWeather,
            // currentClouds,
            // currentIcon
          })
          // dynIcon = 'http://openweathermap.org/img/w/' + currentIcon + '.png'

          // currentCity: res.data.city.name,
          // currentWeather: res.data.list[0].weather[0].description,
          // currentHumidity: res.data.list[0].main.humidity,
          // currentTemp: res.data.list[0].main.temp,
          // currentWind: res.data.list[0].wind.speed,
          // currentIcon: res.data.list[0].weather[0].icon
          // MAKE SWITCH CASE FOR EACH ICON AND RETURN THAT URL
          // this.setState({ weeklyReport })
          // console.log(res)
        })
    })
  }

  render() {
    // let weeklyForecast = this.state.weeklyForecast
    // let weeklyForecastDays = weeklyForecast.map(forecastDay => {})
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
export default Location
