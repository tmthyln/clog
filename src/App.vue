<script setup lang="ts">
import {onMounted} from "vue";
import {useCatStore} from "./stores/cats.ts";

const catStore = useCatStore();

function switchCat(cat) {
    catStore.switchCat(cat.id)
}

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
        <div v-if="catStore.currentCat" class="flex items-center">
          Current Cat:
          <q-btn-dropdown
              :label="catStore.currentCat.name"
              class="q-ml-sm q-pl-md"
              dense outline>
            <q-list>
              <q-item v-for="cat in catStore.cats" :key="cat.id" clickable v-close-popup @click="switchCat(cat)">
                <q-item-section><q-item-label>{{ cat.name }}</q-item-label></q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
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
