import City from '#models/city'
import OpenMeteoService from '#services/open_meteo_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CityWeatherController {
  constructor(protected openMetro: OpenMeteoService) {}

  public async create({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await this.openMetro.fetchWeather(city.id, city.latitude, city.longitude)
    return response.json({ message: `New results fetched for ${city.name} city` })
  }

  public async createAll({ response }: HttpContext) {
    const cities = await City.all()
    for (const city of cities) {
      await this.openMetro.fetchWeather(city.id, city.latitude, city.longitude)
    }
    return response.json({ message: 'New results fetched for all cities' })
  }
}
