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
  <q-form class="row q-pa-sm q-gutter-lg justify-around" @submit.prevent="addNewCat">
    <q-input class="col-4" label="Cat Name" v-model="catName" dense/>
    <q-input class="col-4" label="Birth Date" type="date" v-model="birthdate" dense/>
    <q-btn class="col-2" label="Register Cat" type="submit" dense/>
  </q-form>
</template>

<style scoped>

</style>