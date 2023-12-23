<script setup lang="ts">
import NewCatForm from "../components/NewCatForm.vue";
import {useCatStore} from "../stores/cats.ts";
import {objectDate} from "../stores/dates.ts";

const catStore = useCatStore();
</script>

<template>
  <div>
    <NewCatForm/>

    <q-list separator>
      <q-item v-for="cat in catStore.cats" :key="cat.id">
        <q-item-section>
          <q-item-label>{{ cat.name }}</q-item-label>
          <q-item-label caption>Born on {{ objectDate(cat.birthdate).toLocaleDateString() }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style scoped>

</style>