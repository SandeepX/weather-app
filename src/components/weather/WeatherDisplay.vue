<template>
  <div v-if="weather" class="weather-card card">
    <div class="weather-header">
      <h2>📍 {{ cityName }}</h2>
      <p class="weather-desc" style="margin-top: 10px;">☁️ {{ weatherDescription }}</p>
    </div>

    <div class="weather-temp">
      <p>🌡️ <span class="temp">{{ currentTemp }} °C</span></p>
      <p v-if="isHot" class="hot-warning">🔥 It’s hot today!</p>
    </div>

    <div class="reset-container">
      <button @click="resetWeather" class="reset-btn">🔄 Search Another City</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const weather = computed(() => store.state.weather.weather)

const cityName = computed(() => store.getters['weather/cityName'])
const currentTemp = computed(() => store.getters['weather/currentTemp'])
const weatherDescription = computed(() => store.getters['weather/weatherDescription'])
const isHot = computed(() => store.getters['weather/isHot'])

const resetWeather = () => {
  store.commit('weather/setCountries', [])
  store.commit('weather/setCities', [])
  store.commit('weather/setShowForm', true)
  store.commit('weather/setWeather', null)
  store.commit('weather/setCity', null)
}

</script>

<style scoped>
/* Weather Card */
.weather-card.card {
  background: linear-gradient(135deg, #1f2937, #111827);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  margin: 20px auto;
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}

/* Header */
.weather-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
}

.weather-desc {
  font-size: 1.1rem;
  font-weight: 500;
  color: #9ca3af;
}

/* Temperature */
.weather-temp .temp {
  font-size: 2rem;
  font-weight: 700;
  color: #facc15;
}

/* Hot warning */
.hot-warning {
  font-size: 1rem;
  font-weight: 600;
  color: #f87171; /* red */
  margin-top: 8px;
}

/* Smooth card hover (optional) */
.weather-card:hover {
  transform: translateY(-3px);
  transition: transform 0.2s;
}

.reset-container {
  margin-top: 20px;
}

.reset-btn {
  cursor: pointer;
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.2s;
}

.reset-btn:hover {
  background-color: #1e40af;
  transform: translateY(-2px);
}

</style>
