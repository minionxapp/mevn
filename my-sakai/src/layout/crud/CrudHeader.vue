<template>
    <Toolbar class="mb-6">
        <template #start>
            <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="$emit('openForm')"/>
        </template>

        <template #end>
            <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
        </template>
    </Toolbar>
</template>
˚
<script setup>

const emit = defineEmits(["openForm"])

</script>