<script setup>
const { item } = defineProps(['item'])
</script>

<template>
  <div class="card">
    <div class="card__content">
      <div class="card__header">
        <h3>{{ item.name }}</h3>
        <h3 class="card__id">{{ item.id }}</h3>
      </div>
      <div class="card__specs__wrapper">
        <h4 v-for="specs in item.data">

          {{ specs }}
        </h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #2c3e50;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #2c3e50;
  transition: all 300ms;
  cursor: pointer;
}

.card:hover {
  background: transparent;
}

.card__header{
  display: flex;
  justify-content: space-between;
}
.card__specs__wrapper {
  justify-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  color: #afaf4a;
}

.card__id {
  color: bisque;
}
</style>