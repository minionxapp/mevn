<template>
    <div class="flex flex-column gap-2 my-3">
            <label for="username">Table Name</label>
            <!-- <InputText id="tabelname" v-model="tabel" aria-describedby="username-help" /> -->
            <Dropdown v-model="tabelSelected" :options="tabels" optionLabel="name" placeholder="Select a Tabel" class="w-full" />

     
        {{ tabels }}
        </div>
    <div class="card flex justify-content-center">
        <Button label="Create Kolom" type="button" @click="opeDialog()"></Button>
    </div>
    <Dialog v-model:visible="dialog" modal header="Buat Kolom" :style="{ width: '70%' }">
        <FormKolomComponent @close="closeDialog()"  :tabelName=tabelSelected.name ></FormKolomComponent>
    </Dialog>

</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import FormKolomComponent from '@/components/Dev/FormKolomComponent.vue';
import { useDevStore } from '@/stores/devStores';
import { storeToRefs } from "pinia";

const tabelSelected = ref(null)
const {setPesan} = useDevStore()
const devStores = useDevStore();
const {tabels} =storeToRefs(devStores);

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

onMounted(async()=>{
await setPesan("test")
})

const tabelAja = ref([
    "javascript", "nodejs", "database"
]);
</script>