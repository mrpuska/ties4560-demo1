<script setup lang="ts">
import {ref, watch} from 'vue';

  var countryInfo = ref();

  const props = defineProps({
    countryCode: String
  })

  /**
   * Trigger country search when countryCode is more than 2 chars
   */
  watch(() => props.countryCode, async (newValue, oldValue) => {
    if(newValue != null && newValue.length > 1)
        await fetchCountryInfo();
    else if (newValue != null && newValue.length == 0)
      countryInfo.value = null;
  });

  async function fetchCountryInfo() {
    let res = await fetch(import.meta.env.VITE_API_URL + '/country/' + props.countryCode)
    countryInfo.value = await res.json()
  }

</script>

<template>
  <div v-if="countryInfo">
    <span>{{countryInfo.sCapitalCity + ', ' + countryInfo.sName}}</span>
    <img v-bind:src="countryInfo.sCountryFlag"/>
  </div>
</template>

<style scoped>
img {
  height: auto;
  width: 100px;
}
</style>