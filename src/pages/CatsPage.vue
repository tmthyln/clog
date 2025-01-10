<script setup lang="ts">
import NewCatForm from "../components/NewCatForm.vue";
import {useCatStore} from "../stores/cats.ts";
import {objectDate} from "../stores/dates.ts";

const catStore = useCatStore();
</script>

<template>
  <div>
    <h1 class="title is-2">
      {{ catStore.loading ? 'Rounding up your clowder...' : 'Your Clowder' }}
    </h1>

    <NewCatForm class="mt-3 mb-6"/>

    <div v-if="catStore.loading">
      <article class="message is-link my-3 is-skeleton">
        <header class="message-header">
          <div class="title is-6 has-text-white has-skeleton">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </header>
        <div class="message-body">
          Born on cat birthday.
        </div>
      </article>
      <article class="message is-link my-3 is-skeleton">
        <header class="message-header">
          <div class="title is-6 has-text-white has-skeleton">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </header>
        <div class="message-body">
          Born on cat birthday.
        </div>
      </article>
    </div>
    <div v-else>

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

  </div>
</template>

<style scoped>
</style>