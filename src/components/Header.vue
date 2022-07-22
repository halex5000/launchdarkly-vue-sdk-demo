<template #header>
    <Image image-class="p-image-preview" v-bind:src="headerImagePath" alt="A friendly little badger" />
</template>

<script lang="ts" setup>
    import { inject } from 'vue'
    const headerImagePath = inject('headerImagePath')
</script>