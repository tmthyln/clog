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
  <q-form @submit.prevent="addNewCat">
    <q-input label="Cat Name" v-model="catName"/>
    <q-input label="Birth Date" type="date" v-model="birthdate"/>
    <q-btn label="Register Cat" type="submit"/>
  </q-form>
</template>

<style scoped>

</style>