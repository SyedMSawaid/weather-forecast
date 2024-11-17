import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.table('city_weathers', (table) => {
      table.string('tag')
    })
  }

  public async down() {
    this.schema.table('city_weathers', (table) => {
      table.dropColumn('tag')
    })
  }
}
