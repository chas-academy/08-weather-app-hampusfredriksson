import React, { Component } from 'react'
import axios from 'axios'

class Location extends Component {
  state = {
    lat: null,
    lon: null,
    city: [],
    weather: []
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${
            position.coords.latitude
          }&lon=${
            position.coords.longitude
          }&APPID=12b7b1ce713412cd5dee7735c485b9d5`
        )
        .then(res => {
          this.setState({
            city: res.data.city.name
            // weather: res.data.list[0].weather[0]
          })
          console.log(res)
        })
      // )
    })
  }

  render() {
    return (
      <div>
        <div className='location'>
          <button onClick={this.getLocation}>WHERE YOU AT BOI</button>
          <h3>{this.state.city}</h3>
          <h3>{this.state.weather}</h3>
        </div>
      </div>
    )
  }
}

export default Location
