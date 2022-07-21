<script lang="ts" setup>
import Image from 'primevue/image';
</script>

<template>
  <Image src="./logo.png" alt="LaunchDarkly Logo">
    <template #indicator>
        Preview Content
    </template>
  </Image>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>