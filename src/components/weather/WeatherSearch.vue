<template>
  <div class="weather-container card" v-show="showForm">
    <h2 class="text-center mt-2">🌤️ Weather Search</h2>

    <div class="form-group">
      <label for="country">Select Country</label>
      <select id="country" v-model="selectedCountry" @change="loadCities">
        <option value="">Select Country</option>
        <option v-for="country in countries" :key="country.name" :value="country.name">
          {{ country.name }}
        </option>
      </select>
    </div>

    <div class="form-group" v-show="cities.length">
      <label for="city">Select City</label>
      <select id="city" v-model="selectedCity">
        <option value="">Select City</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>

    <button v-show="selectedCity" @click="searchWeather" :disabled="!selectedCity">Search</button>

    <p v-if="error" class="mt-2 error-text">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const selectedCountry = ref('')
const selectedCity = ref('')

const countries = computed(() => store.state.weather.countries)
const cities = computed(() => store.state.weather.cities)
const error = computed(() => store.state.weather.error)
const showForm = computed(() => store.state.weather.showForm)

const loadCities = () => {
  if (!selectedCountry.value) return
  store.dispatch('weather/fetchCities', selectedCountry.value)
  selectedCity.value = ''
}

const searchWeather = () => {
  if (!selectedCity.value) return
  store.dispatch('weather/fetchWeather', selectedCity.value)
}

onMounted(() => {
  store.dispatch('weather/fetchCountries')
})
</script>

<style scoped>

/* Card layout for weather search */
.weather-container.card {
  background-color: #111827; /* darker card */
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  max-width: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Form group spacing */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Label */
.form-group label {
  font-weight: 500;
  font-size: 0.95rem;
}

/* Selects */
select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #4b5563;
  background-color: #1f2937;
  color: #f9fafb;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

select:hover,
select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}

/* Button */
button {
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

button:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1e40af;
  transform: translateY(-1px);
}

/* Error text */
.error-text {
  color: #f87171;
  font-weight: 500;
}

/* Heading */
.weather-container h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f9fafb;
}
</style>
