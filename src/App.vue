<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useCatStore} from "./stores/cats.ts";

const catStore = useCatStore();

function switchCat(event) {
    const catId = event.target.value;
    catStore.switchCat(catId)
}

const expandMenu = ref(false);

onMounted(catStore.loadCats);
</script>

<template>
  <div>

    <header>
      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">

          <div class="navbar-item is-unselectable has-text-weight-bold">Cat Log</div>

          <a role="button" class="navbar-burger" :class="{'is-active': expandMenu}" aria-label="menu" aria-expanded="false" @click="expandMenu = !expandMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" :class="{'is-active': expandMenu}">
          <div class="navbar-start">
            <router-link class="navbar-item" :to="{name: 'observations'}" @click="expandMenu = false">
              Observations
            </router-link>

            <router-link class="navbar-item" :to="{name: 'cats'}" @click="expandMenu = false">
              Cats
            </router-link>
          </div>

          <div class="navbar-end">
            <div
                v-if="catStore.cats.length > 0"
                class="navbar-item control is-flex is-align-items-baseline">
              <span class="mr-2">Switch cat:</span>
              <div class="select">
                <select :value="catStore.currentCat?.id" @change="switchCat">
                  <option v-for="cat in catStore.cats" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>

    <section class="section container">
      <router-view/>
    </section>

  </div>
</template>

<style scoped>
</style>
