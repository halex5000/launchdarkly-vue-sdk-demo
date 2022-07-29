<template #header>
    <Splitter>
        <SplitterPanel :hidden="!showInline">
            <h5>Inline</h5>
            <Menu :model="menuOptions" />
        </SplitterPanel>
        <SplitterPanel :hidden="!showToggle">
            <h5>Overlay</h5>
            <Button type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"/>
            <Menu id="overlay_menu" ref="menu" :model="menuOptions" :popup="true" />
        </SplitterPanel>
        <SplitterPanel :hidden="!showPanel">
            <h5>Panel Menu</h5>
            <PanelMenu :model="menuOptions" />
        </SplitterPanel>
    </Splitter>
</template>

<script lang="ts" setup>
    import { useLDFlag } from 'launchdarkly-vue-client-sdk'
    import { ref, watch } from 'vue';
    import { useToast } from 'primevue/usetoast';

    const toast = useToast();
    const menu = ref();

    const toggle = (event: any) => {
        menu.value.toggle(event);
    }

    /**
     * menu=style is a string indicating which menu-style should be served to the user
     * this is non-binary flag because we have a number of variations which could be served
     * we can target users by all sort of criteria based on what we include in the data we send to 
     * LaunchDarkly
     */
    const menuStyle = useLDFlag('menu-display', 'inline');
    let showInline = ref(false || menuStyle.value === 'inline');
    let showPanel = ref(false || menuStyle.value === 'panel');
    let showToggle = ref(false || menuStyle.value === 'toggle');
    
    watch(menuStyle, (newValue) => {
        showInline.value = false;
        showPanel.value = false;
        showToggle.value = false;
        switch (newValue) {
            case 'inline':
                showInline.value = true;
                return;
            case 'toggle': 
                showToggle.value = true;
                return;
            case 'panel': 
                showPanel.value = true;
                return;
        }
    })

    const menuOptions = [
            {
                label: 'Options',
                items: [{
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {
                        toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                    }
                }
            ]}
        ]
</script>