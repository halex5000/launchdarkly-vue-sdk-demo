<script lang="ts" setup>
import Image from 'primevue/image';
import { useLDReady } from 'launchdarkly-vue-client-sdk'
</script>

<template>
  <template v-if="useLDReady()">
      <Image  src="./LaunchDarkly-black.png" alt="LaunchDarkly Logo"/>
  </template>
  <template>
    <Image src="./logo.png" alt="A friendly little badger" />
  </template>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>