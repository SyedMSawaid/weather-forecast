import CityWeather from '#models/city_weather'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

// This seeder will create the initial weather datapoint for the seeded cities
export default class extends BaseSeeder {
  async run() {
    await CityWeather.createMany([
      {
        id: 1,
        cityId: 6,
        temperature: -22.0499992370605,
        weatherCode: 71,
      },
      {
        id: 2,
        cityId: 5,
        temperature: 19.7999992370605,
        weatherCode: 2,
      },
      {
        id: 3,
        cityId: 4,
        temperature: 8.89999961853027,
        weatherCode: 3,
      },
      {
        id: 4,
        cityId: 3,
        temperature: 11.25,
        weatherCode: 3,
      },
      {
        id: 5,
        cityId: 2,
        temperature: 22.0499992370605,
        weatherCode: 0,
      },
      {
        id: 6,
        cityId: 1,
        temperature: 6.90000009536743,
        weatherCode: 3,
      },
    ])
  }
}
