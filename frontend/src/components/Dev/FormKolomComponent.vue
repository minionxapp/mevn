<template>

    <form @submit.prevent="handleSubmit">
            <!-- <AlertMessage v-if="errorAlert" :message="errorMsg" /> -->
            <div class="flex flex-column gap-2 my-3">
                <label for="username">Table Name</label>
                <InputText id="tabelname" v-model= props.tabelName aria-describedby="username-help" />
            </div>
            <div class="flex flex-column gap-2 my-3">
                <label for="desc">Desc</label>
                <InputText id="desc" v-model="kolom.desc" aria-describedby="desc-help" />
            </div>
            <div class="flex flex-column gap-2 my-3 mb-1">
                <label for="priv">Priv</label>
                <Dropdown id="priv" v-model="kolom.priv" :options="privs" placeholder="Priv" class="w-full" />
            </div>
            
            <div class="flex align-items-center gap-3">
                <Button label="Submit" type="submit">Create</Button>
            </div>
        </form>
    <!-- </Dialog> -->

</template>

<script setup>
import { reactive,ref } from 'vue';

const props = defineProps(['tabelName'])

const kolom = reactive({
    name: "",
    desc: "",
    priv: "",
    userId: "",
    owner: ""

})
const privs = ref([
    "Private", "Public", "All"
]);
const handleSubmit=()=>{
alert(props.tabelName)
}
</script>
