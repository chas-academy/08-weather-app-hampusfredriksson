import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'
import Forecast from './components/Forecast'
import 'materialize-css/dist/css/materialize.min.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      lat: null,
      long: null,
      currentWeather: [],
      description: [],
      currentTemp: [],
      humidity: [],
      windy: [],
      iconId: '',
      centigrade: true
    }
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.state = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
              this.state.lat
            }&lon=${
              this.state.long
            }&APPID=12b7b1ce713412cd5dee7735c485b9d5&units=metric`
          )
          .then(res => {
            let sunrise = new Date(
              res.data.sys.sunrise * 1000
            ).toLocaleTimeString('sv-SE')
            let sunset = new Date(
              res.data.sys.sunset * 1000
            ).toLocaleTimeString('sv-SE')
            this.setState({
              name: res.data.name,
              description: res.data.weather[0].description,
              currentTemp: res.data.main.temp,
              humidity: res.data.main.humidity,
              windy: res.data.wind.speed,
              sunrise: sunrise,
              sunset: sunset,
              icon: res.data.weather[0].id
            })
          })
      },
      function(error) {
        if (error.code === error.PERMISSION_DENIED)
          alert(
            'You denied Geolocation, therefore no weather will be displayed.'
          )
      }
    )
  }

  changeScale = () => {
    this.setState({
      centigrade: !this.state.centigrade
    })
  }

  toFahrenheit = () => {
    const fahrenheit = (this.state.currentTemp * 9) / 5 + 32 + ' ℉'
    return fahrenheit
  }

  toCelsius = () => {
    const celsius = this.state.currentTemp + ' ℃'
    return celsius
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="weatherInfo">
          <button
            className="waves-effect waves-light btn-large"
            onClick={this.changeScale}>
            <i className="material-icons left">cloud_queue</i>℃ / °F
          </button>
          <h4>{this.state.name}</h4>
          <p>Currently: {this.state.description}</p>
          <p>
            Temperature:{' '}
            {this.state.centigrade ? this.toCelsius() : this.toFahrenheit()}
          </p>
          <p>Humidity: {this.state.humidity}%</p>
          <p>Windy: {this.state.windy}km/h</p>
          <p>Sunrise: {this.state.sunrise}</p>
          <p>Sunset: {this.state.sunset}</p>
        </div>
        <Forecast name={this.state.fiveForecast} />
      </div>
    )
  }
}

export default App
