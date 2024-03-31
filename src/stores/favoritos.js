import {ref, watch} from "vue";
import {defineStore} from "pinia";
import {useBebidasStore} from "@/stores/bebidas.js";

export const useFavoritosStore = defineStore('favoritos', () => {

    const bebidas = useBebidasStore();
    const favoritos = ref([]);

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

    const sincronizarLocalStorage = () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    }

    const handleClickFavorito = () => {
        favoritos.value.push(bebidas.receta);
        //console.log(bebidas.receta)
    }

    return {
        favoritos,
        handleClickFavorito
    }
})