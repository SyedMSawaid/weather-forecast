import City from '#models/city'
import type { HttpContext } from '@adonisjs/core/http'

export default class CitiesController {
  async index({ inertia }: HttpContext) {
    const cities = await City.all()
    return inertia.render('cities/index', { cities })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('cities/create')
  }

  async store({ request, inertia }: HttpContext) {
    const data = request.only(['name', 'latitude', 'longitude'])
    await City.create(data)
    return inertia.location('/cities')
  }

  async show({ params, inertia }: HttpContext) {
    const city = await City.findOrFail(params.id)
    return inertia.render('cities/show', { city })
  }

  async edit({ params, inertia }: HttpContext) {
    const city = await City.findOrFail(params.id)
    return inertia.render('cities/edit', { city })
  }

  async update({ params, request, inertia }: HttpContext) {
    const city = await City.findOrFail(params.id)
    const data = request.only(['name', 'latitude', 'longitude'])
    city.merge(data)
    await city.save()
    return inertia.location('/cities')
  }

  async destroy({ params, inertia }: HttpContext) {
    const city = await City.findOrFail(params.id)
    await city.delete()
    return inertia.location('/cities')
  }
}
