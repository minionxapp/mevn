<template>
    <!-- <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }"> -->
        <span class="p-text-secondary block mb-5">Update your information.</span>
        <div class="flex align-items-center gap-3 mb-3">
            <InputText id="username" class="flex-auto" autocomplete="off" placeholder="Insert Ypur Question"/>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <Editor editorStyle="height :320px" style="width: 100%;" placeholder="Insert Ypur Question"></Editor>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <Dropdown v-model="category" :options="categories" placeholder="Select a City" class="w-full" />

        </div>
        <div class="flex align-items-center gap-3 mb-5"></div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="$emit('close')"></Button>
            <Button type="button" label="Save"  @click="$emit('close')"></Button>
        </div>
    <!-- </Dialog> -->

</template>

<script setup>
import { ref } from 'vue';
defineEmits(["close"])


const category = ref("");
const categories = ref([
   "Javascript","NodeJS","Database"
]);
</script>