<template>
    <div class="card my-2">

    </div> 
    <Panel>
        <template #header>
            <div class="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large"
                    shape="circle" />
                <span class="font-bold">Amy Elsner</span>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-wrap align-items-center justify-content-between gap-3">
                <div class="flex align-items-center gap-2">
                    <Button icon="pi pi-thumbs-up-fill" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button><span>{{ props.data.countVote }}</span>
                </div>
                <span class="p-text-secondary">{{ dateFormat(props.data.createdAt) }}</span>
            </div>
        </template>
        <RouterLink to="/" class="text-4xl text-primary no-underline">{{ props.data.title }}</RouterLink>

        <p class="my-3">
            <span v-html="props.data.question.substring(0,2000)"></span>
        </p>
        <Chip :label="props.data.category" />
    </Panel>

<!-- {{ data }} -->
</template>

<script setup>
import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';

const dateFormat = (dataInput)=>{
    const newDate = new Date(dataInput).toLocaleString();
    return newDate
}
const props = defineProps({
    data :{
        type : Object,
        required: true,

    }
})
</script>