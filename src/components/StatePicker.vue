<template>
    <h5>State Selection</h5>
    <Dropdown  :options="availableStates" placeholder="Pick your state"></Dropdown>
</template>

<script lang="ts" setup>
    import { useLDFlag  } from 'launchdarkly-vue-client-sdk'
    const availableStates = useLDFlag('available-states', ["Confusion"]);
</script>