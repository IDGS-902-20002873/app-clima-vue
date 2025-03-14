import axios from "axios";
import { computed, ref } from "vue";

export default function useClima() {
    
    const clima = ref({});
    const cargando = ref(false);
    const error = ref('');

    const obtenerClima = async (busqueda) => {
        cargando.value = true;
        clima.value = {};
        error.value = '';
        const key = import.meta.env.VITE_API_KEY;
        try {
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${busqueda.ciudad},${busqueda.pais}&limit=1&appid=${key}`;
            const { data } = await axios(url);
            const { lat, lon } = data[0];
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
            const { data: resultado } = await axios(urlClima);
            clima.value = resultado;
        } catch (e) {
            error.value = 'Ciudad no encontrada';
        } finally {
            cargando.value = false;
        }
        
    }

    const mostrarClima = computed(() => {
        return Object.keys(clima.value).length > 0;
    });

    const formatearTemperatura = (temperatura) => parseInt(temperatura - 273.15);

    return { 
        obtenerClima,
        clima,
        cargando,
        mostrarClima,
        formatearTemperatura,
        error
    };
}