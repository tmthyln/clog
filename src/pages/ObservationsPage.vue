<script setup lang="ts">
import Observation from "../components/Observation.vue";
import {useCatStore} from "../stores/cats.ts";
import {useLocalStorage} from "@vueuse/core";

const catStore = useCatStore();

const dateObserved = useLocalStorage('clogAddObservation_dateObserved', '');
const observation = useLocalStorage('clogAddObservation_observation', '');

async function addObservation() {
    if (catStore.currentCat) {
        const added = await catStore.addObservation(catStore.currentCat.id, observation.value, dateObserved.value)
        if (added) {
            observation.value = '';
        }
    }
}
</script>

<template>
  <div>
    <h1 class="title is-2">
      {{ catStore.loading ? 'Rounding up your clowder...' : `About ${catStore.currentCat?.name || 'a Cat'}` }}
    </h1>

    <div v-if="catStore.loading">
      <div class="field">
        <label class="label has-skeleton">Date observed</label>

        <div class="control">
          <input class="input is-skeleton">
        </div>
      </div>

      <div class="field">
        <label class="label has-skeleton">Observation or event</label>

        <textarea class="textarea is-expanded is-skeleton"/>
      </div>

      <div class="control">
        <button class="button is-skeleton">Record</button>
      </div>

      <div class="mt-6 mb-1 skeleton-block"/>
      <div class="mt-0 mb-1 skeleton-block"/>
      <div class="mt-0 mb-1 skeleton-block"/>
      <div class="mt-0 mb-1 skeleton-block"/>
    </div>
    <div v-else-if="catStore.cats.length === 0">
      You don't have any cats yet!
      <router-link :to="{name: 'cats'}">Add some cats first</router-link>, then come back.
    </div>
    <div v-else-if="!catStore.currentCat">
      Choose a cat from your clowder from the cat switcher in the menu.
    </div>
    <div v-else>
      <div>
        <div class="field">
          <label class="label">Date observed</label>

          <div class="control">
            <input class="input" type="date" :value="dateObserved" @input="dateObserved = $event.target.value">
          </div>
        </div>

        <div class="field">
          <label class="label">Observation or event</label>

          <textarea class="textarea is-expanded" :value="observation" @input="observation = $event.target.value"/>
        </div>

        <div class="control">
          <button class="button is-primary" @click="addObservation">Record</button>
        </div>
      </div>

      <div class="panel mt-6">
        <Observation
            v-for="observation in catStore.currentObservations" :key="observation.id"
            :observation="observation"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>