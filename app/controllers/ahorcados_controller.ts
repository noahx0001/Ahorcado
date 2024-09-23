import type { HttpContext } from '@adonisjs/core/http'

export default class AhorcadosController {
    async iniciarjuego({ response }: HttpContext) {

        const palabras = ['php', 'framework', 'laravel', 'insomnia', 'code', 'javascript', 'python', 'java']

        const palabra = palabras[Math.floor(Math.random() * 4)]

        response.cookie('palabra_original', palabra)
        response.cookie('intentos', 15)

        response.cookie('letras_adivinadas', JSON.stringify([]))

        return response.json({
            "mensaje": "¡Juego iniciado, Empieza a adivinar!",
            "palabra": "_".repeat(palabra.length),
            "intentos": 15
        })
    }

    async adivinar({ request, params, response }: HttpContext) {

        // Declara las variables
        let mensaje2 = ""
        let palabra = request.cookie('palabra_original')
        let intentos = request.cookie('intentos') || 0

        let letras_adivinadas = JSON.parse(request.cookie('letras_adivinadas') || '[]')
        response.cookie('ganado', false)

        // Verifica si el juego ha iniciado si no hay palabra
        if (!palabra) {
            return response.json({
                "error": "¡Juego no iniciado, inicia el juego para comenzar a adivinar!"
            })
        }

        //Verifica si el jugador ha perdido
        if (intentos === 0 || request.cookie('ganado') === 'true') {
            return response.json({
                "mensaje": "¡Juego terminado, inicia el juego para comenzar de nuevo!"
            })
        }

        // Verifica si se puso una letra
        if (params.letra) {
            //Verifica si la palabra contiene la letra
            if (palabra.includes(params.letra)) {
                // Verifica si la letra ya fue adivinada
                if (!letras_adivinadas.includes(params.letra)) {

                    letras_adivinadas.push(params.letra) //Agrega la letra a la lista de letras adivinadas
                    response.cookie('letras_adivinadas', JSON.stringify(letras_adivinadas))
                    mensaje2 = "¡Correcto!"
                } else {
                    mensaje2 = "¡Ya existe!"
                    response.cookie('intentos', --intentos)
                }

            } else {
                mensaje2 = "¡Incorrecto!"
                response.cookie('intentos', --intentos)
            }
        }

        // Reemplaza las letras que ya han sido adivinadas 
        // Funcion split devuelve un array de una cadena de texto donde cada elemento es una letra
        // join une todos los elementos del array en una cadena de texto
        // map aplica una función a cada elemento del array
        // join convierte el array en una cadena de texto

        let palabra_guiones = palabra.split('').map((letra: any) => {
            return letras_adivinadas.includes(letra) ? letra : '_';
        }).join('');



        // Verifica si el juego ha terminado
        if (!palabra_guiones.includes('_')) {

            response.cookie('ganado', true)
            mensaje2 = "¡Ganaste!"

            response.clearCookie('intentos')
            response.clearCookie('letras_adivinadas')

            return response.json({
                "mensaje": "¡Juego terminado, inicia el juego para comenzar de nuevo!",
                "acertación": mensaje2,
                "palabra": palabra_guiones + " | " + palabra.length + " letras"
            })

        }

        return response.json({
            "mensaje": "¡Juego iniciado, Empieza a adivinar! " + mensaje2,
            "acertación": mensaje2,
            "palabra": palabra_guiones + " | " + palabra.length + " letras",
            "intentos": intentos + " restantes"
        })
    }
}