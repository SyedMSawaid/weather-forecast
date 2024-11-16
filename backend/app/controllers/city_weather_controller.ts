import City from '#models/city'
import OpenMeteoService from '#services/open_meteo_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class CityWeatherController {
  public async index({ params, inertia }: HttpContext) {
    const city = await City.findOrFail(params.id)
    console.log({ city })
    // await OpenMeteoService.fetchWeather(city.id, city.latitude, city.longitude)
    // return inertia.location(`/cities/${city.id}`)
  }
}
