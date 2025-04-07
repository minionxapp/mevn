<script setup>
import custumFetch from '@/api';
import { FilterMatchMode } from '@primevue/core/api';
import DatePicker from 'primevue/datepicker';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    allData()
    // MyasetService.getMyasets().then((data) => (myasets.value = data));
});

const toast = useToast();
const dt = ref();
const myasets = ref();
const myasetDialog = ref(false);
const deleteMyasetDialog = ref(false);
const deleteMyasetsDialog = ref(false);
const myaset = ref({});
const selectedMyasets = ref();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

// next pake data dari tabel
const categories = ref([
    { label: 'MOTOR', value: 'motor' },
    { label: 'RUMAH', value: 'rumah' },
    { label: 'TANAH', value: 'tanah' },
    { label: 'MOBIL', value: 'mobil' },
]);

const getCategory = (text1) => {
    for (let i = 0; i < (categories.value).length; i++) {
        let obj = categories.value[i];
        if (obj.value === text1) {
            return obj.label;
        }
    }
}

const allData = async () => {
    try {
        const { data } = await custumFetch.get("/myaset")
        myasets.value = data.data
    } catch (error) {
        console.log(error)
    }
}


function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function openNew() {
    myaset.value = {};
    submitted.value = false;
    myasetDialog.value = true;
}

function hideDialog() {
    myasetDialog.value = false;
    submitted.value = false;
}

async function saveMyaset() {
    if (myaset?.value.name?.trim()) {
        if (myaset.value._id) {
            const myasetEdit = await custumFetch.put('/myaset/' + myaset.value._id, {
                name: myaset.value.name,
                description: myaset.value.description,
                category: (myaset.value.category),
                tgl: myaset.value.tgl
            })
            // myaset.value.inventoryStatus = myaset.value.inventoryStatus.value ? myaset.value.inventoryStatus.value : myaset.value.inventoryStatus;
            // myasets.value[findIndexById(myaset.value.id)] = myaset.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Myaset Updated', life: 3000 });
        } else {
            const myasetEdit = await custumFetch.post('/myaset', {
                name: myaset.value.name,
                description: myaset.value.description,
                category: (myaset.value.category),
                tgl: myaset.value.tgl
            })
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Myaset Created', life: 3000 });
        }

        myasetDialog.value = false;
        myaset.value = {};
        allData()
    }
}

function editMyaset(prod) {
    prod.tgl = new Date(prod.tgl)
    myaset.value = { ...prod };
    myasetDialog.value = true;
}

async function confirmDeleteMyaset(prod) {
    myaset.value = prod;
    deleteMyasetDialog.value = true;
}

async function deleteMyaset() {
    myasets.value = myasets.value.filter((val) => val.id !== myaset.value.id);
    const myasetDelete = await custumFetch.delete('/myaset/' + myaset.value._id)
    deleteMyasetDialog.value = false;
    myaset.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Myaset Deleted', life: 3000 });
    allData()
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < myasets.value.length; i++) {
        if (myasets.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}


function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteMyasetsDialog.value = true;
}

function deleteSelectedMyasets() {
    myasets.value = myasets.value.filter((val) => !selectedMyasets.value.includes(val));
    console.log(selectedMyasets.value)
    deleteMyasetsDialog.value = false;
    selectedMyasets.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Myasets Deleted', life: 3000 });
}

function getStatusLabel(status) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}


const formatDate = (value) => {
    if (value !== null) {
        return new Date(value).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
};
</script>

<template>
    <div>
        <Toast />
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <!-- <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected"
                        :disabled="!selectedMyasets || !selectedMyasets.length" /> -->
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedMyasets" :value="myasets" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} myasets">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Myasets</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <!-- <Column field="_id" header="ID" sortable style="min-width: 12rem"></Column> -->
                <Column field="name" header="Name" sortable style="min-width: 12rem"></Column>
                <Column field="description" header="Description" sortable style="min-width: 10rem"></Column>
                <Column field="category" header="Category" sortable style="min-width: 16rem">
                    <template #body="slotProps">
                        {{ getCategory(slotProps.data.category) }}
                        <!-- <Tag :value="getCategory(slotProps.data.category)" /> -->
                    </template>
                </Column>
                <Column field="tgl" header="Tanggal" sortable style="min-width: 16rem">
                    <template #body="{ data }">
                        {{ formatDate(data.tgl) }}
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem" header="Action">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editMyaset(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteMyaset(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="myasetDialog" :style="{ width: '450px' }" header="Myaset Details" :modal="true">
            <div class="flex flex-col gap-6">
                <img v-if="myaset.image" :src="`https://primefaces.org/cdn/primevue/images/myaset/${myaset.image}`"
                    :alt="myaset.image" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="myaset.name" required="true" :invalid="submitted && !myaset.name"
                        fluid />
                    <small v-if="submitted && !myaset.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="myaset.description" required="true" rows="3" cols="20" fluid />
                </div>
            </div>

            <div>
                <label for="tgl" class="block font-bold mb-3">Tanggal</label>
                <DatePicker id="tgl" v-model.trim="myaset.tgl" required="true" :invalid="submitted && !myaset.tgl"
                    fluid />
                <small v-if="submitted && !myaset.tgl" class="text-red-500">Tanggal is required.</small>
            </div>


            <div>
                <label for="category" class="block font-bold mb-3">Category</label>
                <Select id="category" v-model.trim="myaset.category" :options="categories" optionLabel="label"
                    optionValue="value" placeholder="Select a Category" fluid></Select>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveMyaset" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteMyasetDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="myaset">Are you sure you want to delete <b>{{ myaset.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteMyasetDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteMyaset" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteMyasetsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="myaset">Are you sure you want to delete the selected myasets?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteMyasetsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedMyasets" />
            </template>
        </Dialog>
    </div>
</template>