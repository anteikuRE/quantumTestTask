<script setup>
import {store} from '../store.js'
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const isEditing = ref(false)
let item;
let editedItem = {};
onMounted(() => {
  findItem()
  isLoading.value = false
})

function findItem() {
  item = store.data.filter((datum) => (
      datum.id === route.params.id
  ))
  item = item[0]
  editedItem = JSON.parse(JSON.stringify(item));
  console.log(item[0])
}

function Save() {

  item = JSON.parse(JSON.stringify(editedItem));

  console.log(store.data)
  const index = store.data.findIndex(item => item.id === route.params.id);
  console.log(index)
  store.data[index] = item;
}

function Delete() {
  const index = store.data.findIndex(item => item.id === route.params.id);
  store.data.splice(index, 1);
  router.push('/')
}
</script>

<template>
  <div>
    <div style="text-align: center" v-if="isLoading">Loading...</div>
    <div v-else class="card">
      <div class="card__content">

        <div class="card__header">
          <h3 v-if="!isEditing">{{ item.name }}</h3>
          <input v-if="isEditing" @input="event => editedItem.name = event.target.value" :value="item.name"/>
        </div>

        <div class="card__specs__wrapper" v-for="(specs, key) in item.data">
          <h4 v-if="!isEditing">
            {{ key }}: {{ specs }}
          </h4>

          <input v-if="isEditing" @input="event => editedItem.data[key] = event.target.value" :value="specs">
        </div>
      </div>
      <button v-if="!isEditing" @click="isEditing = true">Edit</button>
      <button v-if="isEditing" @click="()=>{isEditing = false; Save()}">Save
      </button>
      <button v-if="isEditing" @click="isEditing = false">Cancel &Cross;</button>
      <button @click="()=>{isEditing = false; Delete()}">Delete &Cross;</button>
      <RouterLink to="/">Home</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>