<template>
  <div>

    <h1>Test 123</h1>
    <p>{{ dataMessage}}</p>
  </div>
</template>

<script setup>
import axios from "axios"
import {ref,onMounted} from "vue"

const dataMessage = ref(null)


const getMessage= async ()=> {
  try {
    const {data} = await axios.get('http://localhost:3000/');
    dataMessage.value = data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(()=>{
  // dataMessage.value = null
  getMessage();
})

</script>