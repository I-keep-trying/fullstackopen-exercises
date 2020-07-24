import React, { useState, useEffect } from 'react'
import './Weather.css'

const Weather = ({ weather, isLoading }) => {
  console.log('weather', weather, 'isLoading', isLoading)
  const code = weather.current.weather_code
  const night = weather.current.is_day
  if (code === 113) {
    return (
      <div>
        <div className="icon sky-gradient">
          {/* sunny */}
          <h3 className="weather-title">Current Weather</h3>
          <div className=""></div>
          <div className=""></div>
          <div className="sun-exp">
            <div className="rays-exp2"></div>
            <div className=""></div>
          </div>
          <div className=""></div>
          <div className="weather-data">
            <div>Temperature: {weather.current.temperature} C</div>
            <div>Wind: {weather.current.wind_speed} kph </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
        <br />
      </div>
    )
  } else if (code === 116) {
    return (
      <div className="icon sky-gradient">
        {/* partly cloudy */}
        <h3 className="weather-title">Current Weather</h3>
        <div className=""></div>
        <div className=""></div>
        <div className="cloud-exp3">
          <div className=""></div>
          <div className=""></div>

          <div className=""></div>
        </div>
        <div className="cloud-exp3"></div>
        <div className="sun-exp">
          <div className="cloud-exp3"></div>
          <div className="rays-exp2"></div>
        </div>
        <div className=""></div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else if (code === 176 || code === 263 || code === 293) {
    return (
      <div className="icon sky-gradient rain-day">
        {/* sunny rain */}
        <h3 className="weather-title">Current Weather</h3>
        <div className=""></div>
        <div className=""></div>
        <div className="cloud-exp3">
          <div className="">
            <div className="rain"></div>
          </div>
        </div>
        <div className="cloud-exp3"></div>
        <div className="sun-exp">
          <div className="cloud-exp3"></div>
          <div className="rays-exp2"></div>
        </div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else if (code === 122 || code === 260) {
    return (
      <div className="icon sky-gradient-overcast">
        {/* overcast */}
        <h3 className="weather-title">Current Weather</h3>
        <div className="cloud-exp3">
          <div className="cloud-exp3"></div>
        </div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else if (code === 200) {
    return (
      <div className="icon sky-gradient-overcast thunderstorm">
        {/* thunderstorm */}
        <h3 className="weather-title">Current Weather</h3>
        <div className=""></div>
        <div className=""></div>
        <div className="cloud-exp3">
          <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt-exp2"></div>
          </div>
          <div className="rain"></div>
        </div>
        <div className=""></div>
        <div className="cloud-exp3"></div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else if (code === 179 || code === 227 || code === 230) {
    return (
      <div className="icon sky-gradient-overcast flurries">
        {/* overcast flurries */}
        <h3 className="weather-title">Current Weather</h3>
        <div className="cloud-exp3">
          <div className="snow">
            <div className="flake"></div>
            <div className="flake"></div>
          </div>
        </div>
        <div className="cloud-exp3"></div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else if (
    code === 143 ||
    code === 182 ||
    code === 185 ||
    code === 266 ||
    code === 281 ||
    code === 284
  ) {
    return (
      <div className="icon sky-gradient-overcast broken-clouds">
        {/* overcast mist */}
        <h3 className="weather-title">Current Weather</h3>
        <div className="cloud-exp3"></div>
        <div className="cloud-exp3"></div>
        <div className="">
          <div className="drops"></div>
          <div className=""></div>
        </div>
        <div className="cloud-exp3"></div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else if (code === 248) {
    return (
      <div className="icon sky-gradient-overcast broken-clouds">
        {/* overcast cloudy */}
        <h3 className="weather-title">Current Weather</h3>
        <div className="cloud-exp3"></div>
        <div className="cloud-exp3"></div>
        <div className="">
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className=""></div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else if (
    code === 296 ||
    code === 299 ||
    code === 302 ||
    code === 305 ||
    code === 308 ||
    code === 311
  ) {
    return (
      <div className="icon sky-gradient-overcast shower-rain">
        {/* overcast rain */}
        <h3 className="weather-title">Current Weather</h3>
        <div className=""></div>
        <div className=""></div>
        <div className="cloud-exp3">
          <div className="rain"></div>
          <div className=""></div>
        </div>
        <div className="cloud-exp3"></div>
        <div className="weather-data">
          <div>Temperature: {weather.current.temperature} C</div>
          <div>Wind: {weather.current.wind_speed} kph </div>
          <div>Wind direction: {weather.current.wind_dir} </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="icon sky-gradient">
          {/* sunny */}
          <h3 className="weather-title">Current Weather</h3>
          <div className=""></div>
          <div className=""></div>
          <div className="sun-exp">
            <div className="rays-exp2"></div>
            <div className=""></div>
          </div>
          <div className=""></div>
          <div className="weather-data">
            <div>Temperature: {weather.current.temperature} C</div>
            <div>Wind: {weather.current.wind_speed} kph </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default Weather

{
  /*     NIGHT ICONS - KEEP FOR FUTURE USE
      <div className="icon sky-gradient-night">
        night
        <div className="moon-exp"></div>
        <div className=""></div>
        <div className="">
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className=""></div>
        <div className="weather-data">
            <div>Temperature: {weather.current.temperature} C</div>
            <div>Wind: {weather.current.wind_speed} kph </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
      </div>
      <br />

      <div className="icon sky-gradient-night">
        cloudy night
        <div className="cloud-exp3">
          <div className="moon-exp"></div>
        </div>
        <div className="">
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className=""></div>
        <div className="weather-data">
            <div>Temperature: {weather.current.temperature} C</div>
            <div>Wind: {weather.current.wind_speed} kph </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
      </div>
      <br />

      <div className="icon sky-gradient-night rain-night">
        rainy night
        <div className=""></div>
        <div className=""></div>
        <div className="cloud-exp3">
          <div className="rain"></div>
          <div className=""></div>
        </div>
        <div className="cloud-exp3"></div>
        <div className="moon-exp">
          <div className="cloud-exp3"></div>
        </div>
        <div className="weather-data">
            <div>Temperature: {weather.current.temperature} C</div>
            <div>Wind: {weather.current.wind_speed} kph </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
      </div>

      <br />

      <div className="icon sky-gradient-night thunderstorm">
        night thunderstorm
        <div className=""></div>
        <div className=""></div>
        <div className="cloud-exp3">
          <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt-exp2"></div>
          </div>
          <div className="rain"></div>
        </div>
        <div className=""></div>
        <div className="cloud-exp3"></div>
        <div className="weather-data">
            <div>Temperature: {weather.current.temperature} C</div>
            <div>Wind: {weather.current.wind_speed} kph </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
      </div> */
}
