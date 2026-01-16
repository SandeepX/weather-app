<template>
  <footer class="app-footer">
    <div class="container">
      <p>© {{ currentYear }} {{ appTitle }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const appTitle = import.meta.env.VITE_APP_TITLE || 'Weather App'
const currentYear = new Date().getFullYear()
</script>

