<script setup>
import {ref, onMounted, computed} from 'vue'
import Card from "@/components/Card.vue";
import {store} from './store.js'

const itemsAppearing = ref(10);
const sortAscending = ref(true);

const sortedData = ref(store.data);

function applySort() {
  sortedData.value = [...store.data]
      .sort((a, b) => {
        return sortAscending.value
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      })
      .slice(0, itemsAppearing.value);
}
function toggleSort() {
  applySort();
  sortAscending.value = !sortAscending.value;
}
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
  <button class="load-btn" @click="toggleSort">

    Sort by Name {{ sortAscending ? '↑' : '↓' }}
  </button>
  <div style="text-align: center" v-if="store.isLoading">Loading...</div>
    <div class="cards-list"  v-else>
  <div  v-for="item in sortedData.slice(0, itemsAppearing)">

    <Card :item="item"/>
  </div>
    </div>
  <div style="display: flex; justify-content: center">
    <button v-if="itemsAppearing !== store.data.length" class="load-btn" @click="LoadMore">Load More</button>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
.cards-list{

    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;

}}
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