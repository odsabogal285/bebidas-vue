import {ref, watch, onMounted} from "vue";
import {defineStore} from "pinia";
import {useBebidasStore} from "@/stores/bebidas.js";
import {useModalStore} from "@/stores/modal.js";

export const useFavoritosStore = defineStore('favoritos', () => {

    const bebidas = useBebidasStore();
    const modal = useModalStore();
    const favoritos = ref([]);

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    });

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

    function sincronizarLocalStorage (){
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    }

    function existeFavorito () {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritosLocalStorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink)
    }

    function agregarFavorito () {
        favoritos.value.push(bebidas.receta);
    }
    function eliminarFavorito () {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink);
    }

    function handleClickFavorito () {
        if(existeFavorito()) {
            eliminarFavorito();
        } else {
           agregarFavorito();
        }
        modal.modal = false;
    }

    return {
        favoritos,
        handleClickFavorito,
        existeFavorito
    }
})