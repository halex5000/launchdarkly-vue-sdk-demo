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

    /**
     * we can use feature flags to bring objects in to help change our application
     * without changing the code
     * 
     * we can use these to populate forms, change validation rules, even present messaging to the user
     */
    const menuOptions = useLDFlag('menu-options', [
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
            ]},
            {
                label: 'Navigate',
                items: [{
                    label: 'Vue Website',
                    icon: 'pi pi-external-link',
                    url: 'https://vuejs.org/',
                },
                {
                    label: 'Router',
                    icon: 'pi pi-upload',
                    command: () => {
                        window.location.hash = "/fileupload"
                    }
                }
            ]}
        ]
    )
</script>