
<template>
  <Home />
</template>

<script setup lang="ts">
  import Home from './components/Home.vue'
  import { useLDFlag, useLDReady } from 'launchdarkly-vue-client-sdk'
  import { ref, provide, watch } from 'vue';
  import { useToast } from "primevue/usetoast";

  let isReady = ref(false);

  try {
    isReady = useLDReady()
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
      console.log(`feature header image path changed from ${oldValue} to ${newValue}`)
      toast.add({severity:'success', summary: 'The header image path flag changed!', detail:`Changed from ${oldValue} to ${newValue}`, life: 3000});
    }

    // while the usage of flags in templates is reactive, those values aren't reactive here in the setup block which
    // only runs on setup, so we need to watch for changes after the flag reference is created
    watch(headerImageFlag, showFlagChange)
    provide('isLaunchDarklyReady', isReady);
  } catch (error) {
    provide('isLaunchDarklyReady', isReady);
  }

</script>
