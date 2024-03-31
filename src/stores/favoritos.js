import {ref, watch, onMounted, computed} from "vue";
import {defineStore} from "pinia";
import {useBebidasStore} from "@/stores/bebidas.js";
import {useModalStore} from "@/stores/modal.js";
import {useNotificacionStore} from "@/stores/notificaciones.js";

export const useFavoritosStore = defineStore('favoritos', () => {

    const bebidas = useBebidasStore();
    const modal = useModalStore();
    const notificaciones = useNotificacionStore();
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

        notificaciones.mostrar = true;
        notificaciones.texto = 'Se agregó a favoritos';
    }
    function eliminarFavorito () {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink);

        notificaciones.mostrar = true;
        notificaciones.texto = 'Eliminado de favoritos';
        //notificaciones.error = true;

    }

    function handleClickFavorito () {
        if(existeFavorito()) {
            eliminarFavorito();
        } else {
           agregarFavorito();
        }
        modal.modal = false;
    }

    const noFavoritos =  computed(() => {
        return favoritos.value.length === 0;
    })

    return {
        noFavoritos,
        favoritos,
        handleClickFavorito,
        existeFavorito
    }
})