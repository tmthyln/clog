<script setup lang="ts">
import NewCatForm from "../components/NewCatForm.vue";
import {useCatStore} from "../stores/cats.ts";
import {objectDate} from "../stores/dates.ts";

const catStore = useCatStore();
</script>

<template>
  <div>
    <h1 class="title is-2">Your Clowder</h1>

    <NewCatForm class="mt-3 mb-5"/>

    <div v-for="cat in catStore.cats" :key="cat.id" class="card my-3">
      <header class="card-header">
        <p class="card-header-title">
          {{ cat.name }}
        </p>
      </header>
      <div class="card-content">
        Born on {{ objectDate(cat.birthdate).toLocaleDateString() }}.
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>