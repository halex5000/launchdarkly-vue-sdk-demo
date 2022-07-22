<template>
    <span :class="{ error: v$.firstName.$errors.length }">
        <h5>First Name</h5>
        <InputText id="firstName" type="text" v-model="v$.firstName.$model"/>
        <div class="p-error" v-for="error of v$.firstName.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </span>
</template>

<script lang="ts" setup>
    import { useLDFlag } from 'launchdarkly-vue-client-sdk'
    import useVuelidate from '@vuelidate/core'
    import { minLength, maxLength } from '@vuelidate/validators'
    import { reactive, ref, watch } from 'vue'

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