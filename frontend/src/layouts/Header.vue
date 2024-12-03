<template>
    <Menubar class="bg-blue-800" :model="items">
        <template #end>
            <Button label="Login" icon="pi pi-user" @click="visible = true" />
        </template>
    </Menubar>

    <!-- dialog -->
    <Dialog v-model:visible="visible" header="Edit Profile" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

    <div class="flex gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username </label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username1</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email1</label>
        <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>

    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
    </div>
</Dialog>

    <!-- dialog end -->
</template>

<script setup>
import Menubar from "primevue/menubar";
import { ref } from "vue";
// import Dialog from 'primevue/dialog';

//state
const visible = ref(false)

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
]);
</script>
