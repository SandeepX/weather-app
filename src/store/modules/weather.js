import axios from 'axios'

const state = {
    countries: [],
    cities: [],
    city: null,
    weather: null,
    loading: false,
    error: null,
    showForm: true,
}

const getters = {
    cityName: (state) => state.weather?.nearest_area?.[0]?.areaName?.[0]?.value || '',
    currentTemp: (state) => state.weather?.current_condition?.[0]?.temp_C ?? null,
    weatherDescription: (state) => state.weather?.current_condition?.[0]?.weatherDesc?.[0]?.value || '',
    isHot: (state, getters) => Number(getters.currentTemp) >= 30
}

const actions = {
    async fetchCountries({ commit }) {
        try {
            const res = await axios.get('https://countriesnow.space/api/v0.1/countries/positions')
            commit('setCountries', res.data.data)
        } catch (e) {
            commit('setError', 'Failed to load countries')
        } finally {
            commit('setLoading', false)
        }
    },

    async fetchCities({ commit }, country) {
        try {
            const res = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country })
            commit('setCities', res.data.data)
        } catch (e) {
            commit('setError', 'Failed to load cities')
        } finally {
            commit('setLoading', false)
        }
    },

    async fetchWeather({ commit }, city) {
        commit('setCity', city)
        commit('setLoading', true)
        commit('setError', null)
        commit('setWeather', null)
        commit('setShowForm', false)

        try {
            const res = await axios.get(`https://wttr.in/${city}?format=j1`)
            commit('setWeather', res.data)
        } catch (err) {
            commit('setError', 'Unable to fetch weather')
            console.error(err)
        } finally {
            commit('setLoading', false)
        }
    }
}

const mutations = {
    setCountries(state, countries) {
        state.countries = countries
    },
    setCities(state, cities) {
        state.cities = cities
    },
    setCity(state, city) {
        state.city = city
    },
    setWeather(state, weather) {
        state.weather = weather
    },
    setLoading(state, status) {
        state.loading = status
    },
    setError(state, error) {
        state.error = error
    },
    setShowForm(state, value) {
        state.showForm = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
