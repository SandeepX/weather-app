<template>
  <div class="app">
    <AppHeader/>

    <main class="app-main">
      <router-view/>
    </main>

    <AppFooter/>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'
</script>
