import { defineStore } from "pinia";
import { ref } from "vue";
import custumFetch from "@/api";
import { useRouter } from "vue-router";


export const useDevStore = defineStore('dev', () => {
    const pesan = ref("PESAN AJA Dah..... ")
    const tabels = ref([])
    const tabelKoloms = ref([])
    const testStore = ref(null)

    const handleCreate = async()=>{
        const devCreate = await custumFetch.get('/dev/createmodel')
        pesan.value = devCreate
    }
    const getKolomByTableId = async(tabelId)=>{
        console.log(tabelId)
        const {data} = await custumFetch.get('/dev/kolombytabel/'+tabelId)
        tabelKoloms.value = data.data
    }

    const setPesan = async(pesan)=>{
        // console.log('dari setpesan :: '+pesan)
        const {data} = await custumFetch.get('/dev/alltables')
        tabels.value = data.data 
        // console.log(tabels.value)
        testStore.value ="testStoreByRef"
        // tabels.value ="string ajahhhh kali......"
    }


    return {handleCreate,pesan,setPesan,tabels,testStore,getKolomByTableId,tabelKoloms}
})