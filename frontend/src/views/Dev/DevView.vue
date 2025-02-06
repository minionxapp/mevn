<template>
    <div>
        <!-- {{ devStore.pesan }} -->
    </div>
    <div class="card flex justify-content-center">
        <Button label="Create Table" type="button" @click="dialog = true"></Button>
    </div>
    <Dialog v-model:visible="dialog" modal header="Buat Table" :style="{ width: '70%' }">
        <FormTabelComponent @close="closeDialog()" @reload="alert('ddddd')" />
    </Dialog>

</template>


<script setup>
import Button from 'primevue/button'
import { ref } from 'vue';
import { useDevStore } from '@/stores/devStores';
import FormTabelComponent from '@/components/Dev/FormTabelComponent.vue';
import Dialog from 'primevue/dialog';


const dialog = ref(false)
const devStore = useDevStore()
const { handleCreate } = devStore

const closeDialog = () => {
    dialog.value = false
}

</script>