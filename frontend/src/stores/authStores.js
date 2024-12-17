import { defineStore } from "pinia";
import { ref } from "vue";
import custumFetch from "@/api";

export const useAuthStore = defineStore('user',()=>{
    const dialog = ref(false)
    const errorMsg = ref(null)
    const errorAlert = ref(false)

    const LoginUser = async(inputData) => {
        try {
            const{data} = await custumFetch.post('auth/login',{
                email : inputData.email,
                password : inputData.password
            })
            console.log(inputData)
            dialog.value =false
            
        } catch (error) {
            errorAlert.value =true
            errorMsg.value = error.response.data.message
            console.log(error.response.data.message)
        }


    }
    return {dialog,LoginUser,errorAlert,errorMsg}
})