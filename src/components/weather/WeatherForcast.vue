<template>
  <div v-if="loading" class="forecast-loading">
    <div class="spinner"></div>
    <p>Loading forecast...</p>
  </div>
  <div class="forecast-container" v-if="forecast.length">
    <h3 class="forecast-title">3-Day Forecast</h3>
    <div class="forecast-cards">
      <div v-for="day in forecast" :key="day.date" class="forecast-card">
        <p class="date">{{ formatDate(day.date) }}</p>
        <p class="temp">🌡️ {{ day.min }}° – {{ day.max }}°</p>
        <p class="desc">☁️ {{ day.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, watch} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const weather = computed(() => store.state.weather.weather)
const loading = computed(() => store.state.weather.loading)
const city = computed(() => store.state.weather.city)


const forecast = computed(() => {
  if (!weather.value?.weather) return []

  return weather.value.weather.map(day => ({
    date: day.date,
    min: day.mintempC,
    max: day.maxtempC,
    desc: day.hourly?.[4]?.weatherDesc?.[0]?.value || ''
  }))
})

const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {weekday: 'short'})

watch(
    city,
    (newCity) => {
      if (newCity && !weather.value) {
        store.dispatch('weather/fetchWeather', newCity)
      }
    },
    {immediate: true}
)
</script>

<style scoped>
.forecast-container {
  margin-top: 24px;
  max-width: 900px;
  margin-left: 100px;
  margin-right: auto;
  padding: 0 16px;
}

.forecast-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  margin-left: 250px;
  color: #f9fafb;
}

.forecast-cards {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.forecast-card {
  background: linear-gradient(135deg, #1f2937, #111827);
  padding: 16px;
  border-radius: 12px;
  min-width: 200px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
  color: #f9fafb;
  flex-shrink: 0;
}

.forecast-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
}

.forecast-card .date {
  font-weight: 600;
  margin-bottom: 8px;
}

.forecast-card .temp {
  font-weight: 500;
  color: #facc15;
  margin-bottom: 6px;
}

.forecast-card .desc {
  font-size: 0.9rem;
  color: #9ca3af;
}

/* Optional: hide scrollbar for nice look */
.forecast-cards::-webkit-scrollbar {
  height: 6px;
}

.forecast-cards::-webkit-scrollbar-thumb {
  background-color: #2563eb;
  border-radius: 3px;
}

.forecast-cards::-webkit-scrollbar-track {
  background: #1f2937;
}

</style>
