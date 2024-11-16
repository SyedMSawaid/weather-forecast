import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CityWeather extends BaseSchema {
  protected tableName = 'city_weather'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onDelete('CASCADE')
        .index('city_id')
      table.float('temperature')
      table.float('humidity')
      table.float('wind_speed')
      table.timestamp('timestamp')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
