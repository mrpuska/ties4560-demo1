<script setup lang="ts">
import Main from './components/Main.vue'
</script>

<template>
  <div>
    <h1>IP Country fetcher</h1>
    <div class="wrapper">
      <suspense>
        <Main/>
      </suspense>
    </div>
  </div>
</template>

<style scoped>

</style>
