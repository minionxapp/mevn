<template>
    <div class="flex flex-column gap-2 my-3">
            <label for="username">Table Name</label>
            <!-- <InputText id="tabelname" v-model="tabel" aria-describedby="username-help" /> -->
            <Dropdown v-model="tabelSelected" :options="tabels" optionLabel="name" placeholder="Select a Tabel" class="w-full" />
        </div>
    <div class="card flex justify-content-center">
        <Button label="Koloms" type="button" @click="showKolom()"></Button>&nbsp;
        <Button label="Create Kolom" type="button" @click="opeDialog()"></Button>
    </div>
    <Dialog v-model:visible="dialog" modal header="Buat Kolom" :style="{ width: '70%' }">
        <FormKolomComponent @close="closeDialog()"  :tabelName=tabelSelected.name :tabelId=tabelSelected._id></FormKolomComponent>
    </Dialog>

<!-- {{ tabels }} -->
  <!-- {{ tabelKoloms }} -->
<!-- data table -->
<div class="card">
        <DataTable :value="tabelKoloms" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
            </template>
            <Column field="tabel" header="Tabel Name" style="width: 20%"></Column>
            <Column field="kol_name" header="Kolom Name" style="width: 20%"></Column>
            <Column field="kol_tipe" header="Tipe" style="width: 20%"></Column>
            <Column field="kol_unique" header="Unique" style="width: 20%"></Column>
            <Column field="kol_default" header="Default" style="width: 20%"></Column>
            <Column field="kol_tabelId" header="TabelId" style="width: 20%"></Column>
            <!-- <Column field="representative.name" header="Representative" style="width: 25%"></Column> -->
        </DataTable>
    </div>
<!-- End data tabel -->


</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import FormKolomComponent from '@/components/Dev/FormKolomComponent.vue';
import { useDevStore } from '@/stores/devStores';
import { storeToRefs } from "pinia";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';           

const tabelSelected = ref(null)
const {setPesan,getKolomByTableId} = useDevStore()
const devStores = useDevStore();
const {tabels,tabelKoloms} =storeToRefs(devStores);

const emit = defineEmits(["close"])
const dialog = ref(false)
const tabel = ref("")
   

const closeDialog = () => {
    dialog.value = false
}
const opeDialog=async()=>{
    dialog.value=true
    await setPesan("pesan dari pemanggil")

}
//state alert
const errorAlert = ref("")
const errorMsg = ref(false)

const showKolom = async() =>{
    // alert(tabelSelected.value.name)
    // alert(JSON.stringify(tabelSelected.value))
    await getKolomByTableId(tabelSelected.value.name);
}

onMounted(async()=>{
await setPesan("test")
})

const tabelAja = ref([
    "javascript", "nodejs", "database"
]);
</script>