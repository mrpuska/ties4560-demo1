<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import Country from './Country.vue'

  var msg: string
  var ipCountryData: any
  var countryISOcode = ref("")
  let ip = ref("");
  var error = ref("")

  /**
   * Get client IP address from Cloudflare
   */
  async function getClientIp(){
    let res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
    let text = await res.text();
    let ipRow = text.trim().split('\n').filter(row => row.includes('ip'))
    if (ipRow.length == 1){
      ip.value = ipRow[0].slice(3 ,ipRow[0].length)
    }
    return null;
  }

  /**
   * Get country code by IP address
   */
  async function getCountryByIp() {
    if (ip){
      console.log(import.meta.env.VITE_API_URL)
      var res = await fetch(import.meta.env.VITE_API_URL + '/lookup/' + ip.value)
      var json = await res.json();
      if (!res.ok) {
        error.value = json.error;
        return;
      }
      ipCountryData = json;
      if (ipCountryData.Country != "")
        countryISOcode.value = ipCountryData.CountryCode;
      else
        error.value = "IP lookup API maximum queries reached"
    }
  }

</script>

<template>
  <div class="info-container">
    <span>IP address: </span> <input v-model="ip">
    <div>
      <button @click="getClientIp">Get client IP</button>
      <button v-if="ip" @click="getCountryByIp">Get country by IP</button>
    </div>

    <span>Country code: </span> <input v-model="countryISOcode">
  </div>

    <Country :countryCode="countryISOcode" />

  <div class="error">
    {{error}}
  </div>

  <button @click="ip = ''; ipCountryData = null; countryISOcode = ''">Clear</button>

<div class="instructions">
  <h3>Search by IP</h3>
  <p>Type in an IP address and click "Get country by IP" to fetch a country by the given IP. Optionally you can fetch your client IP by clicking "Get client IP"</p>
  <h3>Search by country code</h3>
  <p>Type in a country code to fetch a country by a ISO country code.</p>
</div>

</template>

<style scoped>
.info-container{
  display: flex;
  flex-direction: column;
}
.instructions{
  margin-top: 2em;
}
.error{
  color:red;
}
h2,h3{
  font-weight: bold;
}
button {
  margin: 0.5em 0.5em 0 0;
}
</style>
