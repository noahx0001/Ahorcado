import type { HttpContext } from '@adonisjs/core/http';

export default class AhorcadosController {

    async jugar({ response, request, params }: HttpContext) {

        const palabras = ['php', 'framework', 'laravel', 'insomnia', 'code', 'javascript', 'python', 'java']
        const indicePalabra = parseInt(params.palabra)
        const palabra = palabras[indicePalabra]
        let intentos = 4
        const letras_adivinadas: string[] = [];
        const letras: string[] = request.input('letras');
        const jugar = params.jugar


        // Verifica si el juego ha iniciado
        if (!jugar) {
            return response.json({
                mensaje: "¡Juego no iniciado, inicia el juego para comenzar a adivinar!",
                palabra: "_".repeat(palabra.length) + " (" + palabra.length + " letras)"
            });
        }

        // Manejar adivinanza de letra
        let mensaje = '';

        letras.forEach(letra => {
            if (!letras_adivinadas.includes(letra)) {
                letras_adivinadas.push(letra);

                // Verifica si la letra está en la palabra
                if (palabra.includes(letra)) {
                    mensaje = "¡Correcto!";
                } else {
                    mensaje = "¡Incorrecto!";
                    intentos-- // Reduce intentos si la letra no está
                }
            } else {
                mensaje = "¡Ya adivinaste esa letra!"
                intentos--
            }
        });

        // Verifica si el jugador ha perdido
        if (intentos <= 0) {
            return response.json({
                mensaje: "¡Juego terminado, se acabaron los intentos! La palabra era: " + palabra
            });
        }

        // Reemplaza las letras que ya han sido adivinadas
        const palabraOculta = palabra.split('').map((letra: string) => {
            return letras_adivinadas.includes(letra) ? letra : '_';
        }).join('');

        // Verifica si el jugador ha ganado
        if (!palabraOculta.includes('_')) {
            return response.json({
                mensaje: "¡Ganaste! La palabra era: " + palabra + ". ¡Enhorabuena!"
            });
        }

        return response.json({
            mensaje: "¡Sigue intentando! " + mensaje,
            palabra: palabraOculta,
            intentos: intentos + " restantes"
        });
    }
}
