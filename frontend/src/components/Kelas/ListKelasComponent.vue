<template>
    <!-- <ConfirmDialog></ConfirmDialog> -->
    <h1>List Kelas Componet</h1>
    <DataTable :value="data" paginator :rows="5" :rowsPerPageOptions="[2, 10, 20, 50]" tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column header="Nama" style="width: 5%">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <Column field="nama" header="Nama" style="width: 10%"></Column>
        <Column field="keterangan" header="Keterangan" style="width: 30%"></Column>
        <Column field="level" header="Level" style="width: 20%"></Column>

        <Column header="Actions" style="width: 20%">
            <template #body="{ data }">
                <div>
                    <Button icon="pi pi-eye" severity="success" @click="emit('show', data._id)" />&nbsp;
                    <Button icon="pi pi-file-edit" severity="warning" @click="emit('edit', data._id)" />&nbsp;
                    <Button icon="pi pi-trash" severity="danger" @click="emit('hapus', data._id)" />&nbsp;
                </div>
            </template>
        </Column>

    </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const emit = defineEmits(["show", "hapus", "edit"])

const props = defineProps({
    data:
    {
        type: Array,
    }
})

</script>