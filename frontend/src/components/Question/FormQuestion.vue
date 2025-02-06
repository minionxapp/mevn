<template>
    <!-- <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }"> -->
    <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
    <form @submit.prevent="handleSubmit">
        <AlertMessage v-if="errorAlert" :message="errorMsg" />
        <div class="flex align-items-center gap-3 mb-3">
            <InputText id="title" v-model="question.title" class="flex-auto" autocomplete="off"
                placeholder="Insert Ypur Question" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <Editor editorStyle="height :320px" v-model="question.question" style="width: 100%;"
                placeholder="Insert Ypur Question"></Editor>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <Dropdown v-model="question.category" :options="categories" placeholder="Select a City" class="w-full" />

        </div>
        <div class="flex align-items-center gap-3 mb-5"></div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="$emit('close')"></Button>
            <Button type="submit" label="Submit"></Button>
        </div>
    </form>
    <!-- </Dialog> -->

</template>

<script setup>
import { ref, reactive } from 'vue';
import custumFetch from '@/api';
import AlertMessage from '../AlertMessage.vue';

const emit = defineEmits(["close"])



const question = reactive({
    title: "",
    question: "",
    category: ""
})

//state alert
const errorAlert = ref("")
const errorMsg = ref(false)
const clerInput = () => {
    question.title = "",
        question.category = "",
        question.question = ""
}

const handleSubmit = async () => {
    try {
        const Questiondata = await custumFetch.post('/question', {
            title: question.title,
            question: question.question,
            category: question.category
        })
        if (Questiondata) {
            clerInput()
            emit('close')
            emit('reload')
        }
    } catch (error) {
        console.log(error)
        errorAlert.value = true;
        errorMsg.value = error.response.data.message;
    }
}


const category = ref("");
const categories = ref([
    "javascript", "nodejs", "database"
]);
</script>