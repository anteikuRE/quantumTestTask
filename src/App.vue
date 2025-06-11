<script setup>
import {store} from "@/store.js";

fetchData('https://api.restful-api.dev/objects')
async function fetchData(url) {
  try {
    store.isLoading = true
    const response = await fetch(url)
    const awaitedData = await response.json()
    store.data = [...store.data, ...awaitedData]
  } catch (e) {
    console.error('Error: ', e)
  } finally {
    store.isLoading = false
  }
}
</script>

<template>
    <RouterView />
</template>

<style scoped>

</style>

