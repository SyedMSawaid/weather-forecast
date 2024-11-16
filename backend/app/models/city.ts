import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import CityWeather from './city_weather.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  @hasMany(() => CityWeather)
  declare weatherDatapoints: HasMany<typeof CityWeather>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
