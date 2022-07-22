<template #header>
    <Menubar :model="menuOptions" />
</template>

<script lang="ts" setup>
    import { useLDFlag } from 'launchdarkly-vue-client-sdk'

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
</script>