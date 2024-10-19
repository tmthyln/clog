<script setup lang="ts">
import {useCatStore} from "../stores/cats.ts";
import {ref} from "vue";
import {objectDate} from "../stores/dates.ts";

const catStore = useCatStore();

const dateObserved = ref<string>('');
const observation = ref<string>('');

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
      About {{ catStore.currentCat?.name || 'a Cat' }}
    </h1>

    <div v-if="catStore.cats.length === 0">
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
        <div class="panel-block" v-for="observation in catStore.observations">
          <div class="columns">
            <small class="column is-narrow">
              On {{ objectDate(observation.observedDate).toLocaleDateString() }},
            </small>
            <div class="column">
              {{ observation.notes }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>