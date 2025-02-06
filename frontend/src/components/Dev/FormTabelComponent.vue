<template>
    <!-- <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }"> -->
    <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
    <form @submit.prevent="handleSubmit">
        <AlertMessage v-if="errorAlert" :message="errorMsg" />
        <div class="flex flex-column gap-2 my-3">
            <label for="username">Table Name</label>
            <InputText id="tabelname" v-model="tabel.name" aria-describedby="username-help" />
        </div>
        <div class="flex flex-column gap-2 my-3">
            <label for="desc">Desc</label>
            <InputText id="desc" v-model="tabel.desc" aria-describedby="desc-help" />
        </div>
        <div class="flex flex-column gap-2 my-3 mb-1">
            <label for="priv">Priv</label>
            <!-- <InputText id="priv" v-model="tabel.priv" aria-describedby="priv-help"  /> -->
            <Dropdown id="priv" v-model="tabel.priv" :options="privs" placeholder="Priv" class="w-full" />
        </div>

        <div class="flex align-items-center gap-3">
            <Button label="Submit" type="submit">Create</Button>
        </div>
    </form>
    <!-- </Dialog> -->

</template>

<script setup>
import { ref, reactive } from 'vue';
import custumFetch from '@/api';
import AlertMessage from '../AlertMessage.vue';
import Button from 'primevue/button'
import { useDevStore } from '@/stores/devStores';


import InputText from 'primevue/inputtext';

const emit = defineEmits(["close"])

const tabel = reactive({
    name: "",
    desc: "",
    priv: "",
    userId: "",
    owner: ""

})



//state alert
const errorAlert = ref("")
const errorMsg = ref(false)
const clerInput = () => {
    tabel.name = "",
        tabel.desc = "",
        tabel.priv = ""
}

const handleSubmit = async () => {
    // alert("ahhhh........name:" + tabel.name + " desc: " + tabel.desc + "prive: " + tabel.priv)
    try {
        const Tabel = await custumFetch.post('/dev/tabel', {
            name: tabel.name,
            desc: tabel.desc,
            priv: tabel.priv
        })
        if (Tabel) {
            alert("input sukses")
            clerInput()
            emit('close')
            // emit('reload')
        }
    } catch (error) {
        console.log(error)
        errorAlert.value = true;
        errorMsg.value = error.response.data.message;
    }
}

// const category = ref("");
const privs = ref([
    "Private", "Public", "All"
]);
</script>