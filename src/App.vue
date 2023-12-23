<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useCatStore} from "./stores/cats.ts";

const catStore = useCatStore();

onMounted(catStore.loadCats);
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="pets"/>
          </q-avatar>
          Cat Log
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <q-tabs
            vertical
            class="text-secondary">
          <q-route-tab icon="visibility" label="Observations" :to="{name: 'observations'}"/>
          <q-route-tab icon="pets" label="Cats" :to="{name: 'cats'}"/>
        </q-tabs>
        <router-view/>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style scoped>
</style>
