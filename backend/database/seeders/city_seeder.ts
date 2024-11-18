import City from '#models/city'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await City.createMany([
      {
        id: 1,
        name: 'Marburg',
        latitude: 50.8019,
        longitude: 8.7658,
      },
      {
        id: 3,
        name: 'Peshawar',
        latitude: 34.0151,
        longitude: 71.5249,
      },
      {
        id: 4,
        name: 'Paris',
        latitude: 48.864716,
        longitude: 2.349014,
      },
      {
        id: 5,
        name: 'Munich',
        latitude: 48.1351,
        longitude: 11.582,
      },
      {
        id: 6,
        name: 'Abha',
        latitude: 18.2465,
        longitude: 42.5117,
      },
      {
        id: 7,
        name: 'Alaska',
        latitude: 63.5888,
        longitude: 154.4931,
      },
    ])
  }
}
