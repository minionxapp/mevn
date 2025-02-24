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
        //console.log(tabelId)
        const {data} = await custumFetch.get('/dev/kolombytabel/'+tabelId)
        tabelKoloms.value = data.data
    }

    const deleteKolomByTableId = async(tabelId)=>{
        const data = await custumFetch.delete('/dev/kolombytabel/'+tabelId)
        // tabelKoloms.value = data.data.message
        // console.log(data.data)
        pesan.value = data.data.message
    }

    const setLoad = async(pesan)=>{
        const {data} = await custumFetch.get('/dev/alltables')
        tabels.value = data.data 
    }


    //creteModel Script
    const scriptModel= ref()
    const createModel = async(tabelId)=>{
        const data = await custumFetch.get('/dev/createcrudmodel/'+tabelId)
        // console.log(data)
        scriptModel.value=data.data
    }



    const scriptController=ref()
    const createController = async(tabelId)=>{
        const data = await custumFetch.get('/dev/createcrudcontroller/'+tabelId)
        // console.log("tabelSelected.value._id")
        scriptController.value=data.data
    }
    
    const scriptRouter= ref()
    const createRouter = async(tabelId)=>{
        const data = await custumFetch.get('/dev/createrouter/'+tabelId)
        // console.log("tabelSelected.value._id")
        scriptRouter.value=data.data
    }
    
    return {handleCreate,pesan,setLoad,tabels,testStore,getKolomByTableId,
        tabelKoloms,deleteKolomByTableId,createModel,scriptModel,
        createController,scriptController,scriptRouter,createRouter
    }
})