import City from '#models/city'
import OpenMeteoService from '#services/open_meteo_service'
import CityWeather from '#models/city_weather'
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

  public async addTag({ request, params, response }: HttpContext) {
    const cityWeather = await CityWeather.findOrFail(params.id)
    const data = request.only(['tag'])
    cityWeather.tag = data.tag
    await cityWeather.save()
    return response.json({ message: `Tag added to city weather record with ID ${params.id}` })
  }

  public async getTags({ params, response }: HttpContext) {
    const cityWeatherRecords = await CityWeather.query().where('city_id', params.id)

    // Filter out unique tags
    const uniqueTags = [
      ...new Set(cityWeatherRecords.map((record) => record.tag).filter((tag) => tag)),
    ]
    return response.json({ data: uniqueTags })
  }

  public async getWeatherByTag({ request, params, response }: HttpContext) {
    const tag = request.qs().tag || ''

    // Fetch city weather records by tag
    const cityWeatherRecords = await CityWeather.query()
      .where('city_id', params.id)
      .andWhere('tag', tag)
    return response.json({ data: cityWeatherRecords })
  }
}
