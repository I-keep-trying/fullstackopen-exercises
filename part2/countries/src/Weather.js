import React from 'react'
import './Weather.css'

const Weather = ({ weather, setUnit, unit }) => {
  /* I know there must be a better way to do this, but this works for now */
  const localTime = () => {
    const t = weather.location.localtime_epoch
    let dt = new Date(t * 1000)
    let hr = dt.getHours()
    let m = '0' + dt.getMinutes()
    let s = '0' + dt.getSeconds()
    return hr > 12
      ? hr - 12 + ':' + m.substr(-2) + ':' + s.substr(-2) + ' PM'
      : hr + ':' + m.substr(-2) + ':' + s.substr(-2) + ' AM'
  }

  const f = (e) => {
    e.preventDefault()
    setUnit('f')
  }

  const m = (e) => {
    e.preventDefault()
    setUnit('m')
  }

  const units = () => {
    if (unit === 'm') {
      return 'C'
    } else {
      return 'F'
    }
  }
  const windSpeed = () => {
    if (unit === 'm') {
      return 'kph'
    } else {
      return 'mph'
    }
  }
  const code = weather.current.weather_code
  if (code === 113 && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient">
          {/* sunny */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className=""></div>
          <div className=""></div>
          <div className="sun-exp">
            <div className="rays-exp2"></div>
            <div className=""></div>
          </div>
          <div className=""></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>

            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
        <br />
      </div>
    )
  } else if (code === 113 && weather.current.is_day === 'no') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night">
          {/* night */}
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
      </div>
    )
  } else if (code === 116 && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient">
          {/* partly cloudy */}
          <h3 className="weather-title"> Current Weather</h3>
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
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (code === 116 && weather.current.is_day === 'no') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night">
          {/* cloudy night */}
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
      </div>
    )
  } else if ((code === 176 || code === 263 || code === 293) && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient rain-day">
          {/* sunny rain */}
          <h3 className="weather-title"> Current Weather</h3>
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
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (
    (code === 176 || code === 263 || code === 293) &&
    weather.current.is_day === 'no'
  ) {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night rain-night">
          {/*  rainy night */}
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
      </div>
    )
  } else if ((code === 122 || code === 260) && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-overcast">
          {/* overcast */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3">
            <div className="cloud-exp3"></div>
          </div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (
    (code === 122 || code === 260) &&
    weather.current.is_day === 'no'
  ) {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night">
          {/* overcast night */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3">
            <div className="cloud-exp3"></div>
          </div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (code === 200 && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-overcast thunderstorm">
          {/* thunderstorm */}
          <h3 className="weather-title"> Current Weather</h3>
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
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (code === 200 && weather.current.is_day === 'no') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div class="icon sky-gradient-night thunderstorm">
          {/* thunderstorm night */}
          <div class="cloud-exp3">
            <div className="cloud-exp3">
              <div className="lightning">
                <div className="bolt"></div>
                <div className="bolt-exp2"></div>
              </div>
            </div>
          </div>
          <div classname=""></div>
          <div classname="">
            <div classname=""></div>
            <div classname=""></div>
          </div>
          <div classname=""></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if ((code === 179 || code === 227 || code === 230) && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-overcast flurries">
          {/* overcast flurries */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3">
            <div className="snow">
              <div className="flake"></div>
              <div className="flake"></div>
            </div>
          </div>
          <div className="cloud-exp3"></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (
    (code === 179 || code === 227 || code === 230) &&
    weather.current.is_day === 'no'
  ) {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night flurries">
          {/* night flurries */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3">
            <div className="snow">
              <div className="flake"></div>
              <div className="flake"></div>
            </div>
          </div>
          <div className="cloud-exp3"></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if ((
    code === 143 ||
    code === 182 ||
    code === 185 ||
    code === 266 ||
    code === 281 ||
    code === 284
  ) && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-overcast broken-clouds">
          {/* overcast mist */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3"></div>
          <div className="cloud-exp3"></div>
          <div className="">
            <div className="drops"></div>
            <div className=""></div>
          </div>
          <div className="cloud-exp3"></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (
    (code === 143 ||
      code === 182 ||
      code === 185 ||
      code === 266 ||
      code === 281 ||
      code === 284) &&
    weather.current.is_day === 'no'
  ) {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night broken-clouds">
          {/* overcast mist */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3"></div>
          <div className="cloud-exp3"></div>
          <div className="">
            <div className="drops"></div>
            <div className=""></div>
          </div>
          <div className="cloud-exp3"></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (code === 248 && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-overcast broken-clouds">
          {/* overcast cloudy */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3"></div>
          <div className="cloud-exp3"></div>
          <div className="">
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className=""></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (code === 248 && weather.current.is_night === 'no') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night broken-clouds">
          {/* overcast cloudy night */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className="cloud-exp3"></div>
          <div className="cloud-exp3"></div>
          <div className="">
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className=""></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if ((
    code === 296 ||
    code === 299 ||
    code === 302 ||
    code === 305 ||
    code === 308 ||
    code === 311
  ) && weather.current.is_day === 'yes') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-overcast shower-rain">
          {/* overcast rain */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className=""></div>
          <div className=""></div>
          <div className="cloud-exp3">
            <div className="rain"></div>
            <div className=""></div>
          </div>
          <div className="cloud-exp3"></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (
    (code === 296 ||
      code === 299 ||
      code === 302 ||
      code === 305 ||
      code === 308 ||
      code === 311) &&
    weather.current.is_day === 'no'
  ) {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient-night shower-rain">
          {/* overcast rain night */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className=""></div>
          <div className=""></div>
          <div className="cloud-exp3">
            <div className="rain"></div>
            <div className=""></div>
          </div>
          <div className="cloud-exp3"></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  } else if (weather.current.is_day === 'no') {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient">
          {/* sunny */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className=""></div>
          <div className=""></div>
          <div className="sun-exp">
            <div className="rays-exp2"></div>
            <div className=""></div>
          </div>
          <div className=""></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
        <br />
      </div>
    )
  } else {
    return (
      <div>
        Local Time: {localTime()}
        <div>
          <hr /> Select Unit:
          <button onClick={m}> C </button>
          <button onClick={f}>F</button>
        </div>
        <br />
        <div className="icon sky-gradient">
          {/* sunny */}
          <h3 className="weather-title"> Current Weather</h3>
          <div className=""></div>
          <div className=""></div>
          <div className="sun-exp">
            <div className="rays-exp2"></div>
            <div className=""></div>
          </div>
          <div className=""></div>
          <div className="weather-data">
            <div>
              Temperature: {weather.current.temperature} {units()}
            </div>
            <div>Humidity: {weather.current.humidity} %</div>
            <div>
              Wind: {weather.current.wind_speed} {windSpeed()}
            </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default Weather
