
<template>
    <div>
        {{devStore.pesan }}
    </div>
    <div class="card flex justify-content-center">
        <Button label="Submit" type="button" @click="test"></Button>
    </div>
</template>


<script setup>
    import Button from 'primevue/button'
    import { reactive,ref } from 'vue';
    import { useDevStore } from '@/stores/devStores';
    const devStore = useDevStore()
    const {handleCreate} = devStore

    const test = ()=>{
     handleCreate()
    }
</script>