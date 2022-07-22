<script setup lang="ts">
  import Home from './components/Home.vue'
  import { useLDFlag } from 'launchdarkly-vue-client-sdk'
  import { provide, watch } from 'vue';
  import { useToast } from "primevue/usetoast";

  /**
   * we can use feature flags to bring strings in to help change our application
   * without changing the code
   * 
   * we can change the header image, styling, anything we want with feature flags!
   */
  const headerImageFlag= useLDFlag('header-image', './LaunchDarkly-black.png');

  provide('headerImagePath', headerImageFlag);

  const toast = useToast();

  // demonstrating tapping into the change in feature flags so you don't just see the effect
  // but also see notification of the change
  const showFlagChange = (newValue: string, oldValue: string) => {
      toast.add({severity:'success', summary: 'The header image path flag changed!', detail:`Changed from ${oldValue} to ${newValue}`, life: 3000});
  }

  watch(headerImageFlag, showFlagChange)

</script>

<template>
  <Home />
</template>
