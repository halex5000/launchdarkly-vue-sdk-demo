<script lang="ts" setup>
import Image from 'primevue/image';
import Panel from 'primevue/panel';
import { useLDFlag, useLDReady, useLDClient } from 'launchdarkly-vue-client-sdk'

const displayFeatureFlag= useLDFlag('display-feature-flag')
const allFlags = useLDClient().allFlags();
console.log(allFlags);
const allTheFlags: any[] = [];
for (const item in allFlags) {
    // console.log('item', item);
    // console.log(allFlags[item])
    allTheFlags.push({name: item, value: allFlags[item]})
}
const something = [{name: 'something', value: 'something else'}];
</script>

<template>
    <Panel>
        <div v-if="useLDReady()">
            <Message severity="success">LaunchDarkly Client Initialized!! Osmo is ready to help you ship features at light speed!</Message>
            <DataTable :value="allTheFlags" v-if="displayFeatureFlag">
                <Column field="name" header="name"></Column>
                <Column field="value" header="Value"></Column>
            </DataTable>
        </div>
        <div v-else>
            <Message severity="error">LaunchDarkly Client Initialization Failed!! Here's a friendly badger to keep you!</Message>
            <Image src="./logo.png" alt="A friendly little badger" />
        </div>
    </Panel>
</template>