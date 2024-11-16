import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddFieldsToCity extends BaseSchema {
  public async up() {
    this.schema.table('cities', (table) => {
      table.string('name').notNullable()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
    })
  }

  public async down() {
    this.schema.table('cities', (table) => {
      table.dropColumn('name')
      table.dropColumn('latitude')
      table.dropColumn('longitude')
    })
  }
}
