import City from '#models/city'
import type { HttpContext } from '@adonisjs/core/http'

export default class CitiesController {
  async index({ response }: HttpContext) {
    const cities = await City.all()
    return response.json({ cities })
  }

  async create({ response }: HttpContext) {
    return response.json({ message: 'Render create city form' })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'latitude', 'longitude'])
    const city = await City.create(data)
    return response.json({ city })
  }

  async show({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    return response.json({ city })
  }

  async edit({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    return response.json({ city })
  }

  async update({ params, request, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    const data = request.only(['name', 'latitude', 'longitude'])
    city.merge(data)
    await city.save()
    return response.json({ city })
  }

  async destroy({ params, response }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await city.delete()
    return response.json({ message: 'City deleted successfully' })
  }
}
