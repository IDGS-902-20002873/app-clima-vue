<script setup>
    import useClima from '../composables/useClima';
    const { formatearTemperatura } = useClima();
    defineProps({
        clima: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <div class="resultado">
        <h2 class="titulo">Clima de: {{ clima.name }}</h2>
        <!-- <img class="icon" :src="'https://openweathermap.org/img/wn/' + clima.weather[0].icon + '@2x.png'" alt="Imagen de clima"> -->
        <p class="actual">{{ formatearTemperatura(clima.main.temp) }} &deg;C</p>
        <div class="temperaturas">
            <p>Min: <span>{{ formatearTemperatura(clima.main.temp_min) }} &deg;C</span></p>
            <p>Max: <span>{{ formatearTemperatura(clima.main.temp_max) }} &deg;C</span></p>
        </div>
    </div>
</template>