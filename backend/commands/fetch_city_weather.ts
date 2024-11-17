import City from '#models/city'
import OpenMeteoService from '#services/open_meteo_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'

// Cron job to fetch weather data for all cities
export default class FetchCityWeather extends BaseCommand {
  public static commandName = 'fetch:city-weather'
  public static description = 'Fetch weather data for all cities'

  @inject()
  public async run(openMeteo: OpenMeteoService) {
    const cities = await City.all()

    this.logger.info('Fetching weather data for all cities...')

    for (const city of cities) {
      await openMeteo.fetchWeather(city.id, city.latitude, city.longitude)
    }

    this.logger.info('Weather data fetched successfully')
  }
}
