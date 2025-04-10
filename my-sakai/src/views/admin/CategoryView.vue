<script setup>
// import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import CrudHeader from '@/layout/crud/CrudHeader.vue';
import CategoryForm from '@/components/category/CategoryForm.vue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';
import { onMounted } from 'vue';
import custumFetch from '@/api';

const toast = useToast();
const selectedMyasets = ref();
const dialog = ref(false)
const deleteDialog=ref(false)
const action = ref('')
const categories = ref();
const category = ref({});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const openForm = () => {
    dialog.value = true
    action.value = 'new'
    clearForm()
}
const clearForm = () => {
    category.value = {}
}
const closeDialog = (str) => {
    dialog.value = false
}
onMounted(() => {
    allData()
})

const allData = async () => {
    try {
        const { data } = await custumFetch.get("/category")
        categories.value = data.data
    } catch (error) {
        console.log(error)
    }
}

function editData(data) {
    action.value = "edit"
    category.value = { ...data };
    dialog.value = true;
}

async function confirmDelete(data) {
    category.value = data;
    deleteDialog.value = true;
}
// delete berlum di coba, wifi nya mati
const deleteData = async () => {
    try {
        console.log(category.value)
        const categoryDelete = await custumFetch.delete('/category/' + category.value._id)
        deleteDialog.value = false;
        category.value = {};
        toast.add({ severity: 'success', summary: 'Successful', detail: 'category Deleted sukses', life: 3000 });
    allData()
    } catch (error) {
        toast.add({ severity: 'danger', summary: 'Successful', detail: 'category Deleted Gagal', life: 3000 });
    }
}
const handleSubmit = async (data) => {
    if (action.value == 'new') {
        try {
            const category = await custumFetch.post('/category', {
                label: data.label,
                value: data.value,
            })
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 8000 });
            closeDialog()
        } catch (error) {
            toast.add({ severity: 'danger', summary: 'Failed', detail: 'Category Fail ', life: 8000 });
        }
    } else {
        try {
            const category = await custumFetch.put('/category/' + data._id, {
                label: data.label,
                value: data.value,
            })
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Update Berhasil', life: 8000 });
            closeDialog()
        } catch (error) {
            toast.add({ severity: 'danger', summary: 'Failed', detail: 'Update  Gagal ', life: 8000 });
        }
    }
    allData()
}
</script>

<template>
    <div>
        <Toast />
        <h1>
            Category
        </h1>
        <div class="card">
            <CrudHeader @open-form="openForm"> </CrudHeader>
            <CategoryForm :dialog="dialog" :action="action" :data="category" @closeDialog="closeDialog"
                @handleSubmit="handleSubmit" />

            <DataTable ref="dt" v-model:selection="selectedMyasets" :value="categories" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0"></h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="label" header="Label" sortable style="min-width: 12rem"></Column>
                <Column field="value" header="Value" sortable style="min-width: 10rem"></Column>
                <Column :exportable="false" style="min-width: 12rem" header="Action">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editData(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDelete(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

            <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="category">Are you sure you want to delete <b>{{ category.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteData" />
            </template>
        </Dialog>

        </div>
    </div>
</template>