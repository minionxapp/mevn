<template>
    <form @submit.prevent="handleSubmit">
        <AlertMessage v-if="errorAlert" :message="errorMsg" />
        <div class="flex align-items-center gap-3 mb-4">

        </div>
        <label for="nama">Nama Kelas</label>
            <div class="flex align-items-center gap-3 mb-4">
                <InputText id="nama" v-model="kelas.nama"  class="flex-auto" autocomplete="off"  />
            </div>


        <label for="keterangan">Keterangan</label>
        <div class="flex align-items-center gap-3 mb-4">
                <Textarea id="keterangan" v-model="kelas.keterangan" class="flex-auto" autocomplete="off" rows="5"
                placeholder="Keterangan" />
            </div>
            <label for="level">Level</label>
            <div class="flex align-items-center gap-3 mb-3">
                <Dropdown v-model="kelas.level" :options="levels" placeholder="Level" class="w-full" />
            </div>

        <div class="flex align-items-center gap-3 mb-5"></div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="$emit('close')"></Button>
            <Button type="submit" label="Submit"></Button>
        </div>
    </form>

</template>

<script setup>
import { ref, reactive,onMounted } from 'vue';
import custumFetch from '@/api';
import AlertMessage from '../AlertMessage.vue';
import Textarea from 'primevue/textarea';

import FloatLabel from 'primevue/floatlabel';


const emit = defineEmits(["close","reload"])

const kelas= reactive({
    nama:'',
    keterangan:'',
    level:''
})

const props = defineProps({
    data:
    {
        type: Object,
    }
})

onMounted(()=>{
    if(props.data){
        kelas.nama = props.data.nama
        kelas.keterangan=props.data.keterangan
        kelas.level=props.data.level
    }
})

//state alert
const errorAlert = ref("")
const errorMsg = ref(false)
const clerInput = () => {
    kelas.nama = "",
        kelas.keterangan = "",
        kelas.level = ""
}

const handleSubmit = async () => {
    // if(props.data){
        try {
            let Questiondata  = null;
            if(props.data){
                //update
             Questiondata = await custumFetch.put('/kelas/'+props.data._id, {
                nama: kelas.nama,
                keterangan: kelas.keterangan,
                level: kelas.level
            })}else{
                //create
                Questiondata = await custumFetch.post('/kelas', {
                nama: kelas.nama,
                keterangan: kelas.keterangan,
                level: kelas.level
            })
            }
            if (Questiondata) {
                clerInput()
                emit('close')
                emit('reload')
            }
        } catch (error) {
            console.log(error)
            errorAlert.value = true;
            errorMsg.value = error.response.data.message;
        }
    // }else
    // {
    //     try {
    //         const Questiondata = await custumFetch.post('/kelas', {
    //             nama: kelas.nama,
    //             keterangan: kelas.keterangan,
    //             level: kelas.level
    //         })
    //         if (Questiondata) {
    //             clerInput()
    //             emit('close')
    //             emit('reload')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         errorAlert.value = true;
    //         errorMsg.value = error.response.data.message;
    //     }
    // }
}


const category = ref("");
const levels = ref([1,2,3,4,5])
</script>