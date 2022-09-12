<script setup lang="ts">
import Main from './components/Main.vue'
import LunchApp from './components/LunchApp.vue'
import {ref} from 'vue'

  var app = ref(false);

</script>

<template>
  <div class="app">
    <div class="links">
      <a @click="app = false">IP Country fetcher</a>
      <a @click="app = true">Lunch App spec</a>
    </div>
    <div class="wrapper">
      <suspense>
        <Main v-if="!app" />
      </suspense>
    </div>
      <LunchApp v-if="app"/>
  </div>
</template>

<style scoped>
a {
  font-size: xx-large;
  cursor: pointer;
}
.links a{
  margin-right: 0.5em;
}
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
