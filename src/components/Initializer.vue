<template>
    <Panel v-if="displayInitializer" header="Initializer (speed set by feature flag)">
        <Button 
            v-if="!initializing" 
            @click="startLoading(loadingSpeed)">{{initializing ? `Initialized ${loadingSpeedLanguage(loadingSpeed)}!!` : `Initialize ${loadingSpeedLanguage(loadingSpeed)}?` }}
        </Button>
    
        <Panel v-if="initializing" v-bind:header="loadingSpeedLabel">
            <ProgressBar :value="progress" :show-value="true" >
                Percent Complete: {{progress}}%
            </ProgressBar>    
        </Panel>
    </Panel>
</template>

<script lang="ts" setup>
    import { useToast } from "primevue/usetoast";
    import { ref, inject, watch } from 'vue'
    import { useLDFlag  } from 'launchdarkly-vue-client-sdk'
    import Panel from 'primevue/panel';
    
    // enable display of Toast notifications on feature flag changes
    const toast = useToast();

    const showSuccess = () => {
        toast.add({severity:'success', summary: 'Successful Initialization!!', detail:'Just for demo purposes, LaunchDarkly initialized at app startup', life: 3000});
    }

    const notify = inject('notify') as Function

    /**
     * an example of a binary value where we can simply turn something on or off
     * here, we're using this to indicate whether we should display a notification as 
     * feature flag values change, the default is false, we won't show the changes
     */
    const displayInitializer = useLDFlag('display-feature-flag', false);
    watch(displayInitializer, notify('display initializer'))
    
    /**
     * we can also use feature flags to bring in numeric values
     * in this case, we're simulating the speed of progress
     * in reality, LaunchDarkly is initialized before we even see it
     * because we're plugging into the root of the application
     */
    const loadingSpeed = useLDFlag('progress-speed', 20);
    watch(loadingSpeed, notify('loading speed'))
    
    let progress = ref(10);
    let initializing = ref("");
    let loadingSpeedLabel = ref("Initializing... ")

    const startLoading = (progressInterval: number) => {
        initializing.value = "initializing";
        loadingSpeedLabel.value += loadingSpeedLanguage(progressInterval);
        const interval = setInterval(() => {
            progress.value++
            if (progress.value >= 100) {
                clearInterval(interval)
                loadingSpeedLabel.value = "Successfully initialized!!";
                showSuccess();
            }
        }, progressInterval);
    }

    const loadingSpeedLanguage = (speed: number): string => {
        if (speed < 10)  return 'Lightning Fast'
        if (speed < 100)  return 'Speedily'
        if (speed < 500)  return 'Peppily'
        if (speed < 1000)  return 'Slowly'
        return "Snailfully"
    }
</script>