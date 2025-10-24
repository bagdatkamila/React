import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import WeatherList from './components/WeatherList'

const App = () => {
  return (
    <div className='app'>
      <WeatherList/>
    </div>
  )
}

export default App
