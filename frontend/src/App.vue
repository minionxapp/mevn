<template>
 <Header />
 <div class="p-5">
    <RouterView />
 </div>
</template>

<script setup>
import  Header from './layouts/Header.vue'
// import customFetch from './api'
// import { onMounted } from 'vue'

// const getData = async()=>{
//     const res = await customFetch.get("/test")
//     console.log(res)
// }

// onMounted(()=>{
//     getData();
// })
</script>