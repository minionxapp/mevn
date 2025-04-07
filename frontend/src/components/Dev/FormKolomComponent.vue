<template>

    <form @submit.prevent="handleSubmit">
            <!-- <AlertMessage v-if="errorAlert" :message="errorMsg" /> -->
            <div class="flex flex-column gap-2 my-3">
                <label for="username">Table Name</label>
                <InputText id="tabelname" v-model= props.tabelName aria-describedby="username-help" disabled="true"/>
            </div>
            <div class="flex flex-column gap-2 my-3">
                <label for="default">TabelId</label>
                <InputText id="tabelId" v-model=props.tabelId aria-describedby="desc-help" disabled="true"/>
            </div>
            <div class="flex flex-column gap-2 my-3">
                <label for="name">Kolom Name</label>
                <InputText id="name" v-model="kolom.kol_name" aria-describedby="desc-help" />
            </div>
            <div class="flex flex-column gap-2 my-3">
                <label for="tipe">Kolom Tipe</label>
                <!-- <InputText id="tipe" v-model="kolom.kol_tipe" aria-describedby="desc-help" /> -->
                <Dropdown id="tipe" v-model="kolom.kol_tipe" :options="tipes" placeholder="-Pilih-" class="w-full" />
            </div>
            <div class="flex flex-column gap-2 my-3">
                <label for="unique">Kolom Unique</label>
                <!-- <InputText id="desc" v-model="kolom.kol_unique" aria-describedby="desc-help" /> -->
                <Dropdown id="unique" v-model="kolom.kol_unique" :options="uniques" placeholder="-Pilih-" class="w-full" />
            </div>
            <div class="flex flex-column gap-2 my-3">
                <label for="default">Kolom Default</label>
                <InputText id="default" v-model="kolom.kol_default" aria-describedby="desc-help" />
            </div>
            <div class="flex flex-column gap-2 my-3">
                <label for="unique">Kolom Required</label>
                <Dropdown id="required" v-model="kolom.kol_required" :options="uniques" placeholder="-Pilih-" class="w-full" />
            </div>
            
            <div class="flex align-items-center gap-3">
                <Button label="Submit" type="submit">Create</Button>
            </div>
        </form>
    <!-- </Dialog> -->
<!-- {{ props.tabelId }} -->
</template>

<script setup>
import { reactive,ref } from 'vue';
import custumFetch from '@/api';

import Button from 'primevue/button'
const props = defineProps(['tabelName','tabelId'])
const emit = defineEmits(["close","showKolom"])

const kolom = reactive({
    tabel: "",
    kol_name: "",
    kol_tipe: "",
    kol_unique: "",
    kol_default:"",
    kol_tabelId:"",
    kol_required:"",
    owner: "",

})
const uniques = ref(["True", "False"]);
const tipes = ref(["String", "Number","Boolean","Character","Date","Datetime"]);
const handleSubmit= async()=>{
try {
        const Kolom = await custumFetch.post('/dev/tabelkolom', {
            tabel: props.tabelName,
            kol_name: kolom.kol_name,
            kol_tipe: kolom.kol_tipe,
            kol_unique : kolom.kol_unique,            
            kol_default :kolom.kol_default,
            kol_tabelId :props.tabelId,
            kol_required:kolom.kol_required

        })
        if (Kolom) {
            alert("input sukses")
            clerInput()
            emit('showKolom')
            emit('close')
        }
    } catch (error) {
        console.log(error)
        // errorAlert.value = true;
        errorMsg.value = error.response.data.message;
    }
}

const clerInput =()=>{
    kolom.tabel= "",
    kolom.kol_name= "",
    kolom.kol_tipe= "",
    kolom.kol_unique = "",            
    kolom.kol_default ="",
    kolom.kol_required=""
}
</script>
