<template>
    <span>
        <h5>State Selection</h5> 
        <Dropdown  :options="availableStates" placeholder="Pick your state"></Dropdown>
    </span>
</template>

<script lang="ts" setup>
    import { useLDFlag  } from 'launchdarkly-vue-client-sdk'
    const availableStates = useLDFlag('available-states', []);
</script>