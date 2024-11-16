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

// Cities
router.get('/cities', [CitiesController, 'index'])
router.post('/cities', [CitiesController, 'create'])
router.get('/cities/:id', [CitiesController, 'show'])
router.put('/cities/:id', [CitiesController, 'update'])
router.delete('/cities/:id', [CitiesController, 'destroy'])

// City Weather
router.get('/cities/:id/weather', [CityWeatherController, 'create'])
