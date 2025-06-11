<script setup>
import {ref, onMounted} from 'vue'
import Card from "@/components/Card.vue";
import {store} from './store.js'

const itemsAppearing = ref(10);

function LoadMore() {

  itemsAppearing.value = store.data.length;
  // Functionality if we had a lot of objects loading from API and needed upds
  // if (store.data.length < itemsAppearing.value + 10) {
  //   fetchData('https://api.restful-api.dev/objects')
  // }
  // console.log(store.data)
  // itemsAppearing.value = itemsAppearing.value + 10
}

</script>

<template>
  <div style="text-align: center" v-if="store.isLoading">Loading...</div>
  <div v-else v-for="item in store.data.slice(0, itemsAppearing)">
    <Card :item="item"/>
  </div>
  <div style="display: flex; justify-content: center">
    <button v-if="itemsAppearing !== store.data.length" class="load-btn" @click="LoadMore">Load More</button>
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