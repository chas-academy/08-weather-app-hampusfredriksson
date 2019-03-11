import React, { Component } from 'react'
import axios from 'axios'

class Location extends Component {
  state = {
    lat: null,
    lon: null,
    city: [],
    currentWeather: [],
    weeklyData: []
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
          let currentWeather = res.data
          let currentCity = res.data.city.name
          let currentTemp = res.data.list[0].main.temp

          console.log(currentTemp)

          /* Detta delar upp list resultaten till klockslagen 09,15,21.
           * Nästa grej är att vara så nära 09,15,21 jämfört med användaren? eller så gör du ett nytt API anrop med currentWeather[0] och använder funktionen nedanför för att vissa väderprognos kommande dagar.
           */

          let weatherControll = res.data.list.filter(data => {
            let weatherDuringDay = ['09', '15', '21']
            if (weatherDuringDay.includes(data.dt_txt.substring(11, 13))) {
              return data
            }
          })

          console.log(res)

          // const weeklyReport = weeklyData.filter(function(value, index, ar) {
          //   return index % index == 0
          // })
          // console.log(weeklyReport)

          /* MAKE A LOOP THAT RUNS OVER API
          data.list här börjar arrayen
          loopa över var 8e objekt och plocka ut dt_txt som är rätt datum 
          console.log(res.data)
        }
        */

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
    return (
      <div>
        <div className='location'>
          {
            <button onClick={this.getLocation}>WHERE YOU AT BOI</button>
            /* 
            <h3>YOU'RE IN: {this.state.city}</h3>
          <p>And this is the current weather: {this.state.weather}</p>
          <p>Current humidity: {this.state.humidity}</p>
          <p>Current temperature: {this.state.temp}</p>
          <p>Finally, this windy: {this.state.wind}</p>
          {/* <p>{this.state.icon}</p> }
    */
          }
        </div>
      </div>
    )
  }
}

export default Location
