<script setup lang="ts">
import {Observation} from "../stores/cats.ts";
import {objectDate} from "../stores/dates.ts";

defineProps<{
    observation: Observation,
}>()
</script>

<template>
  <div class="panel-block">
    <div class="columns">
      <small class="column is-narrow">
        On {{ objectDate(observation.observedDate).toLocaleDateString() }},
      </small>
      <div class="column">
        <p
            v-for="singleNote in observation.notes.split('\n')" :key="singleNote"
            class="my-0 py-0">
          {{ singleNote }}
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>