<template>
    <div class="card">
        <Card>
            <template #title>Simple CRUD</template>
            <template #content>
                <div class="flex flex-column gap-2 my-3">
                    <label for="username">Table Name</label>
                    <Dropdown v-model="tabelSelected" :options="tabels" optionLabel="name" placeholder="Select a Tabel"
                        class="w-full" />
                </div>
                <div class="card flex justify-content-center">
                    <Button label="Create" type="button" @click="showKolom()"></Button>&nbsp;
                    <!-- <Button label="Create Kolom" type="button" @click="opeDialog()"></Button> -->
                </div>
            </template>
        </Card>
        <TabView>
            <TabPanel header="Kolom">
                <p class="m-0">
                <h1>Tabel Name :{{ tabelName }}</h1>
                {{ tabelKoloms.value }}

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
                    <Column field="_id" header="Id Kolom" style="width: 10%"></Column>
                    <Column field="kol_name" header="Kolom Name" style="width: 20%"></Column>
                    <Column field="kol_tipe" header="Tipe" style="width: 20%"></Column>
                    <Column field="kol_unique" header="Unique" style="width: 20%"></Column>
                    <Column field="kol_default" header="Default" style="width: 10%"></Column>

                </DataTable>
                </p>
            </TabPanel>
            <TabPanel header="Model">
                <h1>{{ tabelName }} Model</h1>
                <div class="card flex justify-content-center">
                    <Textarea v-model=scriptModel autoResize rows="25" cols="300" />
                </div>
            </TabPanel>
            <TabPanel header="Controller">
                <h1>{{ tabelName }} Controller</h1>
                <div class="card flex justify-content-center">
                    <Textarea v-model=scriptController autoResize rows="25" cols="300" />
                </div>
            </TabPanel>
            <TabPanel header="Router">
                <div class="card flex justify-content-center">
                    <Textarea v-model=scriptRouter autoResize rows="25" cols="300" />
                </div>
            </TabPanel>
        </TabView>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import { useDevStore } from '@/stores/devStores';
import { storeToRefs } from "pinia";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import Textarea from 'primevue/textarea';



const tabelName = ref("")
const { setLoad, getKolomByTableId,createModel,createController,createRouter } = useDevStore()
const devStores = useDevStore();
const { tabels, tabelKoloms,scriptModel,scriptController,scriptRouter} = storeToRefs(devStores);


const tabelSelected = ref(null)
onMounted(async () => {
    await setLoad("test")
})

const showKolom = async () => {
    if (tabelSelected.value !== null) {
        tabelName.value = tabelSelected.value.name
        await getKolomByTableId(tabelSelected.value.name);
        await createModel(tabelSelected.value._id)
        await  createController(tabelSelected.value._id)

        await createRouter(tabelSelected.value._id)
        console.log(scriptController.value)
        // console.log(tabelKoloms.value)  http://localhost:3000/api/v1/dev/createcrudmodel/67a456454e73731d03264590

    } else {
        alert("silakan pilih tabel")
    }
}
 
const opeDialog = () => {
    alert("opendialog")
}
</script>