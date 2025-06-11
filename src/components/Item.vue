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
  if (confirm('Are you sure you want to delete this item?')) {

    const index = store.data.findIndex(item => item.id === route.params.id);
    store.data.splice(index, 1);
    router.push('/')
  }
}
</script>

<template>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <div style="text-align: center" v-if="isLoading">Loading...</div>
    <div v-else class="item">
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
      <div class="item__controls">

        <button v-if="!isEditing" @click="isEditing = true">Edit</button>
        <button v-if="isEditing" @click="()=>{isEditing = false; Save()}">Save
        </button>
        <button v-if="isEditing" @click="isEditing = false">Cancel &Cross;</button>
        <button style="background: maroon; border:1px solid maroon; margin-top: 10px"
                @click="() => {  isEditing = false; Delete();  }"

        >Delete &Cross;
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-evenly;
}

.item__controls {
  display: flex;
  flex-direction: column;
}

input {
  border-radius: 100px;
  margin: 5px;
  color: white;
  padding: 12px 20px;
  background: transparent;
  border: 1px solid #2c3e50;
}

input:focus {
  outline: none;
}

button {
  margin-bottom: 10px;
  font-size: 16px;
  color: beige;
  background: #2c3e50;
  padding: 12px 20px;
  border-radius: 30px;
  border: 1px solid #2c3e50;
  transition: all 300ms;
  cursor: pointer;
}

button:hover {
  background: transparent !important;
}

</style>