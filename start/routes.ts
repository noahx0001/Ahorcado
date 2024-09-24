/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AhorcadosController from '#controllers/ahorcados_controller'

router.get('/', async () => 'It works!')

router.post('/ahorcado/:palabra/:jugar?', [AhorcadosController, 'jugar']).where('palabra', '[0-9]')

