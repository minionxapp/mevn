<template>
    <Dialog  modal :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }">
        <template #container="{ closeCallback }">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-column px-5 py-5 gap-4"
                style="border-radius: 12px; background-image: radial-gradient(circle at left top, var(--primary-400), var(--primary-700))">
                <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="block mx-auto">
                    <path
                        d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                        fill="var(--primary-700)" />
                    <path
                        d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                        fill="var(--primary-200)" />
                </svg>
                <div class="block mx-auto text-white">
                    <h1>LOGO</h1>
                </div>
                <AlertMessage  v-if="autStores.errorAlert" :message ="autStores.errorMsg"/>
                <div class="inline-flex flex-column gap-2" v-if="!isLogin">
                    <label for="name" class="text-primary-50 font-semibold">Username</label>
                    <InputText id="name"  type="text" v-model="userInput.name" class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem">
                    </InputText>
                </div>
                <div class="inline-flex flex-column gap-2">
                    <label for="email" class="text-primary-50 font-semibold">Email</label>
                    <InputText id="email"  type="email" v-model="userInput.email" class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem">
                    </InputText>
                </div>
                <div class="inline-flex flex-column gap-2">
                    <label for="password" class="text-primary-50 font-semibold">Password</label>
                    <InputText id="password" 
                    v-model="userInput.password" class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"
                        type="password"></InputText>
                </div>
                <div class="flex align-items-center gap-3">
                    <Button label="Cancel" type="submit" text
                        class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    <Button :label="isLogin ? 'Login' : 'Register'" 
                    type="submit" text
                        class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                </div>
                <div style=" width: 300px;" class="text-white" >
                    <p v-if ="isLogin">
                        Belum punya akun? silahkan daftar
                        <span @click="isLogin = false" class="cursor-pointer my-2 text-green-400">Register</span>
                    </p>
                    <p v-else>
                        Sudh punya akun? silahkan login
                        <span @click="isLogin = true" class="cursor-pointer my-2 text-green-400">Login</span>
                    </p>
                </div>
            </div>
        </form>
        </template>
    </Dialog>
</template>

<script setup>
import { reactive,ref } from 'vue';
import { useAuthStore } from '@/stores/authStores';
import AlertMessage from './AlertMessage.vue';

const autStores = useAuthStore();

const {LoginUser,RegisterUser} = autStores
//state
const userInput = reactive({
    name :"",
    email:"",
    password :""
})

const clearInput =()=>{
    userInput.name="",
    userInput.email="",
    userInput.password=""
}

const isLogin = ref(true)
const handleSubmit = () => {
    if(isLogin.value==true){
        LoginUser(userInput)
    }else{
        RegisterUser(userInput)
        clearInput()
    }
}

</script>