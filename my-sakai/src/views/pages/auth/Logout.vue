<template>
    <h1>Logout</h1>
    <Button label="Login" @click="login"></Button>
</template>

<script setup>
// import router from '@/router';
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from '../../../stores/authStores.js';

//action
const { LogoutUser } = useAuthStore();
const router = useRouter()

onMounted(() => {
    LogoutUser()
})

const login = () => {
    // alert("login")
    router.push({ name: 'login' })
}
</script>