<script setup lang="ts">
import {useCatStore} from "../stores/cats.ts";
import { useLocalStorage } from "@vueuse/core/index.cjs";

const catStore = useCatStore();

const catName = useLocalStorage('clogNewCat_catName', '');
const birthdate = useLocalStorage('clogNewCat_birthdate', '');

async function addNewCat() {
    await catStore.addCat(catName.value, birthdate.value)

    catName.value = "";
    birthdate.value = "";
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