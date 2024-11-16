/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const CitiesController = () => import('#controllers/cities_controller')
const CityWeatherController = () => import('#controllers/city_weather_controller')

router.resource('cities', CitiesController)
router.get('/cities/:id/weather', [CityWeatherController, 'create'])
