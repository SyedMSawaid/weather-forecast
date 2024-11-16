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
        current: 'temperature_2m,relative_humidity_2m,windspeed_10m',
      }

      const responses = await fetchWeatherApi(this.apiUrl, params)
      const response = responses[0]
      const current = response.current()!

      const cityWeather = new CityWeather()
      cityWeather.cityId = cityId
      cityWeather.temperature = current.variables(0)!.value()
      cityWeather.humidity = current.variables(1)!.value()
      cityWeather.windSpeed = current.variables(2)!.value()
      cityWeather.timestamp = DateTime.now()

      await cityWeather.save()
    } catch (error) {
      logger.error('Error fetching weather data:', error)
    }
  }
}

export default OpenMeteoService
