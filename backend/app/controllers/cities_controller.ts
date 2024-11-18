import City from '#models/city'
import OpenMeteoService from '#services/open_meteo_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CitiesController {
  constructor(protected openMetro: OpenMeteoService) {}

  async index({ response }: HttpContext) {
    const cities = await City.query().preload('weatherDatapoints', (query) => {
      query.select('*').orderBy('created_at', 'desc').groupBy('city_id')
    })
    return response.json({ data: cities })
  }

  async create({ request, response }: HttpContext) {
    const data = request.only(['name', 'latitude', 'longitude'])
    const city = await City.create(data)

    // Fetch weather data for the city
    await this.openMetro.fetchWeather(city.id, city.latitude, city.longitude)
    return response.json({ data: city, message: 'City successfully created' })
  }

  async show({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await city.load('weatherDatapoints', (query) => {
      query.orderBy('created_at', 'desc')
    })
    return response.json({ data: city })
  }

  async update({ params, request, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    const data = request.only(['name', 'latitude', 'longitude'])
    city.merge(data)
    await city.save()

    // Fetch weather data for the city
    await this.openMetro.fetchWeather(city.id, city.latitude, city.longitude)
    return response.json({ data: city, message: 'City successfully updated' })
  }

  async destroy({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await city.delete()
    return response.json({ data: city, message: 'City deleted successfully' })
  }
}
