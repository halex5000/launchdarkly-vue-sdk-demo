<script lang="ts" setup>
import Image from 'primevue/image';
import Panel from 'primevue/panel';
import { inject, provide } from 'vue'
import { useToast } from "primevue/usetoast";
import { useLDReady  } from 'launchdarkly-vue-client-sdk'
import FirstName from './FirstName.vue'
import StatePicker from './StatePicker.vue'
import Initializer from './Initializer.vue';
import Menu from './Menu.vue';

// enable display of Toast notifications on feature flag changes
const toast = useToast();

const showFailure = () => {
    toast.add({severity:'error', summary: 'LaunchDarkly Initialization Failed'})
    return true;
}

const headerImagePath = inject('headerImagePath')

// demonstrating tapping into the change in feature flags so you don't just see the effect
// but also see notification of the change
const notify = (flagName: string) => (newValue: any, oldValue: any) => {
    console.log(`feature ${flagName} changed from ${oldValue} to ${newValue}`)
    toast.add({severity:'success', summary: `The ${flagName} flag changed!`, detail:`Changed from ${oldValue} to ${newValue}`, life: 3000});
}
provide('notify', notify);

</script>

<template >
    <Toast position="top-right"/>
    <Panel>
        <template #header>
            <Image image-class="p-image-preview" v-bind:src="headerImagePath" alt="A friendly little badger" />
        </template>
        <div v-if="useLDReady()">
            <Initializer />
        </div>
        <div v-else>
            <Message 
                severity="error">LaunchDarkly Client Initialization Failed!! Here's a friendly badger to keep you company!
            </Message>
            <Image src="./logo.png" alt="A friendly little badger" />
            <template v-if="showFailure()"></template>
        </div>
        <Panel>
            <Menu> </Menu>
            <StatePicker />
            <FirstName />
        </Panel>
    </Panel>
</template>