<template>
    <Toast />
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected"
                        :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <!-- 

            -->
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]" :filters="filters"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Products</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="_id" header="Code" sortable style="min-width: 12rem"></Column>
                <Column field="title" header="Title" sortable style="min-width: 16rem"></Column>
                <Column field="question" header="Question" sortable style="min-width: 16rem"></Column>
                <Column field="category" header="Category" sortable style="min-width: 16rem"></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                            :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>



        </div>
        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Item Details" :modal="true">
            <div class="flex flex-col gap-6">
                <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
                    :alt="product.image" class="block m-auto pb-4" />
                <form @submit.prevent="handleSubmit">
                    <AlertMessage v-if="errorAlert" :message="errorMsg" />
                    <div>
                        <label for="id" class="block font-bold mb-3">ID</label>
                        <InputText id="id" v-model.trim="item._id" required="false" :invalid="submitted && !item._id"
                            fluid readonly="true" />
                        <small v-if="submitted && !item.id" class="text-red-500">ID is required.</small>
                    </div>
                    <div>
                        <label for="title" class="block font-bold mb-3">Title</label>
                        <InputText rows="5" id="title" v-model.trim="item.title" required="false" fluid />
                        <!-- :invalid="submitted && !item.title"  -->
                        <small v-if="submitted && !item.title" class="text-red-500">Title is required.</small>
                    </div>
                    <div>
                        <label for="question" class="block font-bold mb-3">Question</label>
                        <Textarea id="question" v-model.trim="item.question" required="false"
                            :invalid="submitted && !item.question" fluid />
                        <small v-if="submitted && !item.question" class="text-red-500">Title is required.</small>
                    </div>
                    <div>
                        <label for="category" class="block font-bold mb-3">Category</label>
                        <InputText id="category" v-model.trim="item.category" required="false"
                            :invalid="submitted && !item.category" fluid />
                        <small v-if="submitted && !item.category" class="text-red-500">Title is required.</small>
                    </div>
                    <div class="flex align-items-center gap-3 mb-5"></div>
                    <div class="flex justify-content-end gap-2">
                        <Button type="button" label="Cancel" severity="secondary" @click="$emit('close')"></Button>
                        <Button type="submit" label="Submit"></Button>
                    </div>
                </form>
            </div>
        </Dialog>


        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
            </div>
            <template #footer="slotProps">
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct(slotProps.data)" />
            </template>
        </Dialog>

    </div>
</template>

<script setup>
import custumFetch from '@/api';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import AlertMessage from '../../components/AlertMessage.vue';
const toast = useToast();

const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const submitted = ref(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const errorMsg = ref(false)
const errorAlert = ref("")
const edit = ref(false)


const item = ref({});
onMounted(async () => {
    // await ProductService.getProducts().then((data) => (products.value = data));
    allData()
});


const allData = async () => {
    try {
        const { data } = await custumFetch.get("/question")
        // console.log(data.data)
        products.value = data.data
    } catch (error) {
        console.log(error)
    }
}
function openNew() {
    item.value = {}
    item.value._id = 1
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}
function editProduct(prod) {
    edit.value = true
    console.log(prod + '  ' + edit.value)
    item.value = { ...prod };
    productDialog.value = true;
}

function confirmDeleteProduct(productId) {
    product.value = productId;
    deleteProductDialog.value = true;
}


const deleteProduct = async () => {
    const itemDel = await custumFetch.delete('/question/' + product.value._id)
    // products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    allData()
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}



function confirmDeleteSelected() {
    alert("testt")
    deleteProductsDialog.value = true;
}

function exportCSV() {
    // dt.value.exportCSV();
}

const handleSubmit = async () => {
    try {
        if (edit.value == true) {
            const Questiondata = await custumFetch.put('/question/' + item.value._id, {
                title: item.value.title,
                question: item.value.question,
                category: item.value.category
            })
            console.log(Questiondata)
            edit.value = false
            if (Questiondata) {
                productDialog.value = false
                allData()
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Update Berhasil', life: 8000 });
            }
        } else {
            const Questiondata = await custumFetch.post('/question', {
                title: item.value.title,
                question: item.value.question,
                category: item.value.category
            })
            if (Questiondata) {
                productDialog.value = false
                allData()
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Insert Berhasil', life: 8000 });
            }


        }
        item.value = {}

    } catch (error) {
        console.log(error)
        errorAlert.value = true;
        errorMsg.value = error.response.data.message;
    }
}


</script>