<template>
    <span :class="{ error: v$.firstName.$errors.length }">
        <h5>First Name</h5>
        <InputText id="firstName" type="text" v-model="v$.firstName.$model"/>
        <div class="p-error" v-for="error of v$.firstName.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </span>
    <span>
        <Card v-if="v$.firstName.$model">
            <template #content v-if="v$.firstName.$model">
                nice to meet you {{ v$.firstName.$model }}
            </template>
        </Card>
    </span>
</template>

<script lang="ts" setup>
    import { useLDFlag, useLDClient } from 'launchdarkly-vue-client-sdk'
    import useVuelidate from '@vuelidate/core'
    import { minLength, maxLength } from '@vuelidate/validators'
    import { reactive, ref, watch, computed } from 'vue'

    const firstNameValidationRules = useLDFlag('first-name-validation-rules', { minLength: 10, maxLength: 12});
    const disableFirstNameValidation = useLDFlag('disable-first-name-validation', true);

    let minimumNameLength = ref(firstNameValidationRules.value.minLength);
    let maximumNameLength = ref(firstNameValidationRules.value.maxLength);
    let disableValidation = ref(disableFirstNameValidation.value);

    watch(firstNameValidationRules, (newValue) => {
        minimumNameLength.value = newValue.minLength;
        maximumNameLength.value = newValue.maxLength;
    })

    const validations = computed( () => {
        if (disableValidation.value) {
            return {
                firstName: {}
            };
        }
        return {
            firstName: {
                minLength: minLength(minimumNameLength),
                maxLength: maxLength(maximumNameLength)
            }
        };
    });

    const state = reactive({
        firstName: '',
    });

    const v$ = useVuelidate(validations, state);

    const client = useLDClient();
    client.identify({
        firstName: state.firstName,
        key: '1234',
    })
</script>