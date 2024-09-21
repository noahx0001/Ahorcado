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

router.get('/iniciar-juego', [AhorcadosController, 'iniciarjuego'])
router.get('/adivinar/:letra', [AhorcadosController, 'adivinar'])
