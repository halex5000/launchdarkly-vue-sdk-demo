<script lang="ts" setup>
import Image from 'primevue/image';
import Panel from 'primevue/panel';
import { ref, inject, watch } from 'vue'
import { useToast } from "primevue/usetoast";
import { useLDFlag, useLDReady  } from 'launchdarkly-vue-client-sdk'

/**
 * we can also use feature flags to bring in numeric values
 * in this case, we're simulating the speed of progress
 * in reality, LaunchDarkly is initialized before we even see it
 * because we're plugging into the root of the application
 */
const loadingSpeed = useLDFlag('progress-speed', 20);

let progress = ref(10);
let initializing = ref("");
let loadingSpeedLabel = ref("Initializing LaunchDarkly ")

const startLoading = (progressInterval: number) => {
    initializing.value = "initializing";
    loadingSpeedLabel.value += loadingSpeedLanguage(progressInterval);
    const interval = setInterval(() => {
        progress.value++
        if (progress.value >= 100) {
            clearInterval(interval)
            loadingSpeedLabel.value = "LaunchDarkly initialized!!";
            showSuccess();
        }
    }, progressInterval);
}

const toast = useToast();

const showSuccess = () => {
    toast.add({severity:'success', summary: 'Success!!', detail:'It actually happened on app startup though, this is just for illustration purposes', life: 3000});
}

const showFailure = () => {
    toast.add({severity:'error', summary: 'LaunchDarkly Initialization Failed'})
    return true;
}

const loadingSpeedLanguage = (speed: number): string => {
    if (speed < 10)  return 'Lightning Fast'
    if (speed < 100)  return 'Speedily'
    if (speed < 500)  return 'Peppily'
    if (speed < 1000)  return 'Slowly'
    return "Snailfully"
}

const headerImagePath = inject('headerImagePath')

// demonstrating tapping into the change in feature flags so you don't just see the effect
// but also see notification of the change
const showFlagChange = (flagName: string) => (newValue: any, oldValue: any) => {
    toast.add({severity:'success', summary: `The ${flagName} flag changed!`, detail:`Changed from ${oldValue} to ${newValue}`, life: 3000});
}

watch(loadingSpeed, showFlagChange('loading speed'))

</script>

<template >
    <Toast position="top-right"/>
    <Panel>
        <template #header>
            <Image image-class="p-image-preview" v-bind:src="headerImagePath" alt="A friendly little badger" />
        </template>
        <div v-if="useLDReady()">
            <Button v-if="!initializing" @click="startLoading(loadingSpeed)">{{initializing ? "Initialized!" : "Initialize LaunchDarkly?" }}</Button>
            <Panel v-if="initializing" v-bind:header="loadingSpeedLabel">
                <ProgressBar :value="progress" :show-value="true" >
                    Percent Complete: {{progress}}%
                </ProgressBar>    
            </Panel>
        </div>
        <div v-else>
            <Message severity="error">LaunchDarkly Client Initialization Failed!! Here's a friendly badger to keep you company!</Message>
            <Image src="./logo.png" alt="A friendly little badger" />
            <template v-if="showFailure()"></template>
        </div>
    </Panel>
</template>