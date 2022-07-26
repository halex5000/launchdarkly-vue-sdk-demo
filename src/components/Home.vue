<script lang="ts" setup>
import Image from 'primevue/image';
import Panel from 'primevue/panel';
import { inject, provide } from 'vue'
import { useToast } from "primevue/usetoast";
import FirstName from './FirstName.vue'
import StatePicker from './StatePicker.vue'
import Initializer from './Initializer.vue';
import Menu from './Menu.vue';
import Header from './Header.vue';

// enable display of Toast notifications on feature flag changes
const toast = useToast();

// demonstrating tapping into the change in feature flags so you don't just see the effect
// but also see notification of the change
const notify = (flagName: string) => (newValue: any, oldValue: any) => {
    console.log(`feature ${flagName} changed from ${oldValue} to ${newValue}`)
    toast.add({severity:'success', summary: `The ${flagName} flag changed!`, detail:`Changed from ${oldValue} to ${newValue}`, life: 3000});
}

provide('notify', notify);
const isLaunchDarklyReady = inject('isLaunchDarklyReady', false);

</script>

<template >
    <Toast position="top-right"/>
    <Panel>
        <div v-if="isLaunchDarklyReady">
            <Header />
            <Initializer />
            <Panel>
                <Menu />
                <StatePicker />
                <FirstName />
            </Panel>
        </div>
        <div v-else>
            <Message severity="error">
                LaunchDarkly Client Initialization Failed!! Here's a friendly badger to keep you company!
            </Message>
            <Message severity="warn">You're probably still setting up or you need to add your client ID to the `.env` file</Message>
            <Image src="./logo.png" alt="A friendly little badger" />
        </div>
    </Panel>
</template>