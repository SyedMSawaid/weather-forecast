import City from '#models/city'
import OpenMeteoService from '#services/open_meteo_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class CitiesController {
  async index({ response }: HttpContext) {
    const cities = await City.query().preload('weatherDatapoints', (query) => {
      query.orderBy('timestamp', 'desc')
    })
    return response.json({ data: cities })
  }

  async create({ request, response }: HttpContext) {
    const data = request.only(['name', 'latitude', 'longitude'])
    const city = await City.create(data)
    await OpenMeteoService.fetchWeather(city.id, city.latitude, city.longitude)
    return response.json({ data: city, message: 'City successfully created' })
  }

  async show({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    return response.json({ data: city })
  }

  async update({ params, request, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    const data = request.only(['name', 'latitude', 'longitude'])
    city.merge(data)
    await city.save()
    await OpenMeteoService.fetchWeather(city.id, city.latitude, city.longitude)
    return response.json({ data: city, message: 'City successfully updated' })
  }

  async destroy({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await city.delete()
    return response.json({ data: city, message: 'City deleted successfully' })
  }
}
