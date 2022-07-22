<script lang="ts" setup>
import Image from 'primevue/image';
import Panel from 'primevue/panel';
import { reactive, ref, inject, watch } from 'vue'
import { useToast } from "primevue/usetoast";
import { useLDFlag, useLDReady  } from 'launchdarkly-vue-client-sdk'
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength } from '@vuelidate/validators'

/**
 * we can also use feature flags to bring in numeric values
 * in this case, we're simulating the speed of progress
 * in reality, LaunchDarkly is initialized before we even see it
 * because we're plugging into the root of the application
 */
const loadingSpeed = useLDFlag('progress-speed', 20);


/**
 * an example of a binary value where we can simply turn something on or off
 * here, we're using this to indicate whether we should display a notification as 
 * feature flag values change, the default is false, we won't show the changes
 */
const displayInitializer = useLDFlag('display-feature-flag', false);

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

// enable display of Toast notifications on feature flag changes
const toast = useToast();


const showSuccess = () => {
    toast.add({severity:'success', summary: 'Successful Initialization!!', detail:'Just for demo purposes, LaunchDarkly initialized at app startup', life: 3000});
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
const notify = (flagName: string) => (newValue: any, oldValue: any) => {
    console.log(`feature ${flagName} changed from ${oldValue} to ${newValue}`)
    toast.add({severity:'success', summary: `The ${flagName} flag changed!`, detail:`Changed from ${oldValue} to ${newValue}`, life: 3000});
}

watch(loadingSpeed, notify('loading speed'))
watch(displayInitializer, notify('display initializer'))

/**
 * we can use feature flags to bring objects in to help change our application
 * without changing the code
 * 
 * we can use these to populate forms, change validation rules, even present messaging to the user
 */
const menuOptions = useLDFlag('menu-options', [
    {
      icon: "pi-eye",
      label: "View",
      message: {
        detail: "default detail",
        life: 3000,
        severity: "success",
        summary: "you are viewing things"
      }
    }
  ]
)
const availableStates = useLDFlag('available-states', ["Confusion"]);
const firstNameValidationRules = useLDFlag('first-name-validation-rules', { minLength: 10, maxLength: 12});

let minimumNameLength = ref();
let maximumNameLength = ref();

watch(firstNameValidationRules, (newValue) => {
    minimumNameLength.value = newValue.minLength;
    maximumNameLength.value = newValue.maxLength;
})

const validations = {
    firstName: {
        minLength: minLength(minimumNameLength),
        maxLength: maxLength(maximumNameLength)
    },
};

const state = reactive({
    firstName: '',
});

const v$ = useVuelidate(validations, state);

</script>

<template >
    <Toast position="top-right"/>
    <Panel>
        <template #header>
            <Image image-class="p-image-preview" v-bind:src="headerImagePath" alt="A friendly little badger" />
        </template>
        <div v-if="useLDReady()">
            <template v-if="displayInitializer">
                <Button 
                    v-if="!initializing" 
                    @click="startLoading(loadingSpeed)">{{initializing ? `Initialized ${loadingSpeedLanguage(loadingSpeed)}!!` : `Initialize ${loadingSpeedLanguage(loadingSpeed)}?` }}
                </Button>
            
                <Panel v-if="initializing" v-bind:header="loadingSpeedLabel">
                    <ProgressBar :value="progress" :show-value="true" >
                        Percent Complete: {{progress}}%
                    </ProgressBar>    
                </Panel>
            </template>
        </div>
        <div v-else>
            <Message 
                severity="error">LaunchDarkly Client Initialization Failed!! Here's a friendly badger to keep you company!
            </Message>
            <Image src="./logo.png" alt="A friendly little badger" />
            <template v-if="showFailure()"></template>
        </div>
        <Panel>
            <template #header>
                <Menubar :model="menuOptions" />
            </template>
            <div>
                <h5>State Selection</h5>
                <Dropdown  :options="availableStates" placeholder="Pick your state"></Dropdown>
            </div>
            <span :class="{ error: v$.firstName.$errors.length }">
                <h5>First Name</h5>
                <InputText id="firstName" type="text" v-model="v$.firstName.$model"/>
                <div class="p-error" v-for="error of v$.firstName.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </span>
        </Panel>
    </Panel>
</template>