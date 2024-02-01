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

    <article v-for="cat in catStore.cats" :key="cat.id" class="message is-link my-3">
      <header class="message-header">
        <div class="title is-6 has-text-white">
          {{ cat.name }}
        </div>
      </header>
      <div class="message-body">
        Born on {{ objectDate(cat.birthdate).toLocaleDateString() }}.
      </div>
    </article>
  </div>
</template>

<style scoped>
</style>