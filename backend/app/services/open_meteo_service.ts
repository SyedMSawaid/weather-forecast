import CityWeather from '#models/city_weather'
import logger from '@adonisjs/core/services/logger'
import { DateTime } from 'luxon'
import { fetchWeatherApi } from 'openmeteo'

class OpenMeteoService {
  private static apiUrl = 'https://api.open-meteo.com/v1/forecast'

  public static async fetchWeather(
    cityId: number,
    latitude: number,
    longitude: number
  ): Promise<void> {
    try {
      const params = {
        latitude: [latitude],
        longitude: [longitude],
        current: 'temperature_2m,weather_code',
      }

      const responses = await fetchWeatherApi(this.apiUrl, params)
      const response = responses[0]
      const current = response.current()!

      const cityWeather = new CityWeather()
      cityWeather.cityId = cityId
      cityWeather.temperature = current.variables(0)!.value()
      cityWeather.weatherCode = current.variables(1)!.value()
      cityWeather.timestamp = DateTime.now()

      // TODO: Add local time
      await cityWeather.save()
    } catch (error) {
      console.log({ error })
      logger.error('Error fetching weather data:', error)
    }
  }
}

export default OpenMeteoService
