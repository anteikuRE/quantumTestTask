<script setup>
import {ref, onMounted} from 'vue'
import Card from "@/components/Card.vue";

const data = ref([])
const isLoading = ref(true)
const itemsAppearing = ref(10);

onMounted(() => {
  fetchData('https://api.restful-api.dev/objects')
})

function LoadMore() {
  if (data.value.length < itemsAppearing.value + 10) {
    fetchData('https://api.restful-api.dev/objects')
  }
  console.log(data.value)
  itemsAppearing.value = itemsAppearing.value + 10
}

async function fetchData(url) {
  try {
    isLoading.value = true
    const response = await fetch(url)
    const awaitedData = await response.json()
    data.value = [...data.value, ...awaitedData]
  } catch (e) {
    console.error('Error: ', e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div style="text-align: center" v-if="isLoading">Loading...</div>
  <div v-else v-for="item in data.slice(0, itemsAppearing)">
    <Card :item="item"/>
  </div>
  <div style="display: flex; justify-content: center">
    <button class="load-btn" @click="LoadMore">Load More</button>
  </div>
</template>

<style scoped>
.load-btn {
  font-size: 16px;
  color: beige;
  background: #2c3e50;
  padding: 12px 20px;
  border-radius: 30px;
  border: 1px solid #2c3e50;
  transition: all 300ms;
  cursor: pointer;
}
</style>

