import {openrouter} from '../lib/ia'
import {streamText} from 'ai'

export default {
    async generarReceta (prompt) {
        const resultado = streamText({
            model: openrouter('meta-llama/llama-4-maverick:free'),
            //system: 'Configuración del sistema',
            prompt,
            //temperature: 1, //si se pone 1 la inteligencia se pone creativa
        });

        return resultado.textStream;
    }
}