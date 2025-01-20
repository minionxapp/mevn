import { defineStore } from "pinia";
import { ref } from "vue";
import custumFetch from "@/api";
import { useRouter } from "vue-router";


export const useDevStore = defineStore('dev', () => {
    const pesan = ref(null)
    // const LoginUser = async (inputData) => {
    //     try {
    //         const { data } = await custumFetch.post('auth/login', {
    //             email: inputData.email,
    //             password: inputData.password
    //         })
    //         currentUser.value = data.data
    //         localStorage.setItem("user",JSON.stringify(data.data))
    //         dialog.value =false
    //         // console.log(data)
    //         router.push({name:'Dashboard'})

    //     } catch (error) {
    //         errorAlert.value = true
    //         errorMsg.value = error.response.data.message
    //         console.log(error.response.data.message)
    //     }
    // }

    const handleCreate = async()=>{
        const devCreate = await custumFetch.get('/dev/createmodel')
        pesan.value = devCreate
    }

    return {handleCreate,pesan}
})