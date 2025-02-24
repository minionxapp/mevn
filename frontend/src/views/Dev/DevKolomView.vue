<template>
    <div class="flex flex-column gap-2 my-3">
        <label for="username">Table Name</label>
        <Dropdown v-model="tabelSelected" :options="tabels" optionLabel="name" placeholder="Select a Tabel"
            class="w-full" />
    </div>
    <div class="card flex justify-content-center">
        <Button label="Koloms" type="button" @click="showKolom()"></Button>&nbsp;
        <Button label="Create Kolom" type="button" @click="opeDialog()"></Button>
    </div>
    <Dialog v-model:visible="dialog" modal header="Buat Kolom" :style="{ width: '70%' }">
        <FormKolomComponent @close="closeDialog()" @showKolom="showKolom()" :tabelName=tabelSelected.name :tabelId=tabelSelected._id>
        </FormKolomComponent>
    </Dialog>

    <!-- data table -->
    <div class="card">
        <DataTable :value="tabelKoloms" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
            </template>
            <Column field="kol_tabelId" header="Tabel Id" style="width: 10%"></Column>
            <Column field="tabel" header="Tabel Name" style="width: 20%"></Column>
            <Column field="_id" header="Id Kolom" style="width: 10%"></Column>
            <Column field="kol_name" header="Kolom Name" style="width: 20%"></Column>
            <Column field="kol_tipe" header="Tipe" style="width: 10%"></Column>
            <Column field="kol_unique" header="Unique" style="width: 10%"></Column>
            <Column field="kol_default" header="Default" style="width: 10%"></Column>
            <Column field="kol_required" header="Required" style="width: 10%"></Column>
            <Column header="Actions" style="width: 20%">
                <template #body="{ data }">
                    <div>
                        <Button icon="pi pi-phone" label="delete" @click="hapusData(data._id, data.kol_name)" />&nbsp;
                    </div>
                </template>
            </Column>
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

const tabelSelected = ref(null)
const { setLoad, getKolomByTableId,deleteKolomByTableId } = useDevStore()
const devStores = useDevStore();
const { tabels, tabelKoloms,pesan } = storeToRefs(devStores);

const emit = defineEmits(["close","showKolom"])
const dialog = ref(false)
const tabel = ref("")


const hapusData = async(id, name) => {
    await deleteKolomByTableId(id)
    alert("Hapus kolom id:" +id+ "  "+ name+"  "+pesan.value)
    showKolom()
}
const closeDialog = () => {
    dialog.value = false
}
const opeDialog = async () => {
    dialog.value = true
    await setLoad("pesan dari pemanggil")

}
//state alert
const errorAlert = ref("")
const errorMsg = ref(false)

const showKolom = async () => {
    // console.log(tabelSelected.value)
    if(tabelSelected.value !== null){
        await getKolomByTableId(tabelSelected.value.name)
    }else{
        alert("silakan pilih tabel")
    }
}

onMounted(async () => {
    await setLoad("test")
})

const tabelAja = ref([
    "javascript", "nodejs", "database"
]);
</script>