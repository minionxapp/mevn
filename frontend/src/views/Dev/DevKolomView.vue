<template>
    <div class="flex flex-column gap-2 my-3">
            <label for="username">Table Name</label>
            <InputText id="tabelname" v-model="tabel" aria-describedby="username-help" />
        </div>
    <div class="card flex justify-content-center">
        <Button label="Create Kolom" type="button" @click="opeDialog()"></Button>
    </div>
    <Dialog v-model:visible="dialog" modal header="Buat Kolom" :style="{ width: '70%' }">
        <FormKolomComponent @close="closeDialog()" @reload="alert('ddddd')" :tabelName=tabel ></FormKolomComponent>
    </Dialog>

</template>

<script setup>
import { reactive, ref } from 'vue';
import FormKolomComponent from '@/components/Dev/FormKolomComponent.vue';
const emit = defineEmits(["close"])
const dialog = ref(false)
const tabel = ref("")
   
const closeDialog = () => {
    dialog.value = false
}
const opeDialog=()=>{
    alert(tabel.value)
    dialog.value=true
}
//state alert
const errorAlert = ref("")
const errorMsg = ref(false)
</script>