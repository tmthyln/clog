<script setup lang="ts">
import {ref} from "vue";
import {useCatStore} from "../stores/cats.ts";

const catStore = useCatStore();

const catName = ref('');
const birthdate = ref('');

async function addNewCat() {
    await catStore.addCat(catName.value, birthdate.value)
}
</script>

<template>
  <div>
    <div class="field is-grouped">
      <p class="control is-expanded" :class="{'is-skeleton': catStore.loading}">
        <input class="input" type="text" placeholder="Cat Name" :value="catName" @input="catName = $event.target.value">
      </p>

      <p class="control is-expanded" :class="{'is-skeleton': catStore.loading}">
        <input class="input" type="date" placeholder="Birth Date" :value="birthdate" @input="birthdate = $event.target.value">
      </p>

      <p class="control">
        <button class="button is-primary" :class="{'is-skeleton': catStore.loading}" @click="addNewCat">Register Cat</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>