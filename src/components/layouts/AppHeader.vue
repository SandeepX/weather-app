<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">{{ appTitle }}</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
    const appTitle = import.meta.env.VITE_APP_TITLE || 'Weather App'
</script>
