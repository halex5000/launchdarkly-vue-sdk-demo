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
import { useLDFlag } from 'launchdarkly-vue-client-sdk'

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

const targetingEnablement = useLDFlag('targeting-enablement', {
    name: false,
    state: false,
});

const menuStyle = useLDFlag('menu-display', '');

</script>

<template >
    <Toast position="top-right"/>
    <Panel class="align-items-center justify-content-center p-panel" header="LaunchDarkly Demo Vue App">
        <div v-if="isLaunchDarklyReady">
            <Header />
            <Initializer />
            <Splitter layout="vertical" v-if="menuStyle">
                <SplitterPanel>
                    <Menu />
                </SplitterPanel>
                <SplitterPanel>
                    <Splitter v-if="targetingEnablement.state || targetingEnablement.name">
                        <SplitterPanel  v-if="targetingEnablement.name" class="flex align-items-center justify-content-center">
                            <FirstName />
                        </SplitterPanel>
                        <SplitterPanel v-if="targetingEnablement.state" class="flex align-items-center justify-content-center">
                           <StatePicker />
                        </SplitterPanel>
                    </Splitter>
                </SplitterPanel>
            </Splitter>
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