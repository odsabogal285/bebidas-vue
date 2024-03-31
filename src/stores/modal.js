import {ref, computed} from "vue";
import {defineStore} from "pinia";
import {useFavoritosStore} from "@/stores/favoritos.js";
import {useBebidasStore} from "@/stores/bebidas.js";

export const useModalStore = defineStore('modal', () => {

    const modal = ref(false);
    const favoritos = useFavoritosStore();
    const bebidas = useBebidasStore();


    const textoBoton = computed(() => {
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de Favoritos' : 'Agregar a favoritos'
    });

    function handleClickModal () {
        modal.value = !modal.value
    }

    return {
        modal,
        handleClickModal,
        textoBoton
    }
});