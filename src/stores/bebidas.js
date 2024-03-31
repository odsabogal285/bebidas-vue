import {defineStore} from "pinia";
import {ref, onMounted, reactive, computed} from "vue";
import APIService from "@/services/APIService.js";
import {useModalStore} from "@/stores/modal.js";


export const useBebidasStore = defineStore('bebidas', () => {

    const modal = useModalStore();

    const categorias = ref([]);
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    });

    const recetas = ref([]);
    const receta = ref({});


    onMounted(async () => {
        const { data: {drinks }} = await APIService.obtenerCategorias();
        categorias.value = drinks;
    });

    async function obtenerRecetas () {
        const {data: {drinks}} = await APIService.buscarRecetas(busqueda);
        recetas.value = drinks;
    }

    async function seleccionarBebida (id) {
       const {data: {drinks}} = await APIService.buscarReceta(id);
        receta.value = drinks[0]
        console.log(drinks[0])
        modal.handleClickModal();
    }

    const noRecetas = computed(() => {
        return recetas.value.length === 0;
    })

    return {
        categorias,
        busqueda,
        recetas,
        receta,
        noRecetas,
        seleccionarBebida,
        obtenerRecetas,

    }
});