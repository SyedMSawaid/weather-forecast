import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import City from './city.js'

export default class CityWeather extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cityId: number

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @column()
  declare temperature: number

  @column()
  declare weatherCode: number

  @column()
  declare tag: string

  @column.dateTime()
  declare timestamp: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
