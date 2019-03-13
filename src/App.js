import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Location from './components/Location'
import Navbar from './components/Navbar'
import Forecast from './components/Forecast'

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
            currentWeather: res.data,
            description: res.data.weather[0].description,
            currentTemp: res.data.main.temp,
            humidity: res.data.main.humidity
            // windSpeed: res.data.wind.speed
          })
        })
    })
  }

  render() {
    return (
      // {currentWeather.data.name}
      <div>
        <Navbar />
        <Location
          res={this.state.currentWeather}
          description={this.state.description}
          currentTemp={this.state.currentTemp}
          humidity={this.state.humidity}
          // windSpeed={this.state.wind.speed}
        />
        <Forecast />
      </div>
    )
  }
}

export default App
