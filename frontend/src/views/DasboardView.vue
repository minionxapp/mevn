<template>
    <div v-if='user'>
        <h1> hai .... </h1>
        <h2>Selamt data kembali {{ user.name }}</h2>
    </div>
    <h1>Welcome .........</h1>
</template>
<script setup>
import custumFetch from '@/api';
import { ref,onMounted } from 'vue';

const user = ref(null)

const getUser = async()=>{
    const {data} = await custumFetch.get('/auth/getuser')
    user.value = data.user
    console.log(data)
}

onMounted(()=>{
    getUser()
})
</script>