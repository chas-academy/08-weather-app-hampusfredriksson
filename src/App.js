import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Location from './components/Location'
import Navbar from './components/Navbar'
import Forecast from './components/Forecast'
import 'materialize-css/dist/css/materialize.min.css'

class App extends Component {
  state = {
    currentWeather: [],
    description: [],
    currentTemp: [],
    humidity: []
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            position.coords.latitude
          }&lon=${
            position.coords.longitude
          }&APPID=12b7b1ce713412cd5dee7735c485b9d5&units=metric`
        )
        .then(res => {
          this.setState({
            name: res.data.name,
            description: res.data.weather[0].description,
            currentTemp: res.data.main.temp,
            humidity: res.data.main.humidity
          })
          // console.log(res)
        })
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Location
          name={this.state.name}
          description={this.state.description}
          currentTemp={this.state.currentTemp}
          humidity={this.state.humidity}
        />
        <Forecast name={this.state.fiveForecast} />
      </div>
    )
  }
}

export default App
