import scheduler from 'adonisjs-scheduler/services/main'
import FetchCityWeather from '../commands/fetch_city_weather.js'

// Cron Jobs

// Fetchs weather data for all cities every hour
scheduler.command(FetchCityWeather).everyHours(1)
