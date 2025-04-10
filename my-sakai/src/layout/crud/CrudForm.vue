<template>
     <Dialog v-model:visible="props.dialog" :style="{ width: '450px' }" header="Myaset Details" :modal="true">
            <div class="flex flex-col gap-6">
                <!-- <img v-if="myaset.image" :src="`https://primefaces.org/cdn/primevue/images/myaset/${myaset.image}`"
                    :alt="myaset.image" class="block m-auto pb-4" /> -->
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="myaset.name" required="true" :invalid="submitted && !myaset.name"
                        fluid />
                    <!-- <small v-if="submitted && !myaset.name" class="text-red-500">Name is required.</small> -->
                </div>
                <div>
                    <label for="category" class="block font-bold mb-3">Category</label>
                    <Select id="category" v-model.trim="myaset.category" :options="categories" optionLabel="label"
                        optionValue="value" placeholder="Select a Category" fluid></Select>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <!-- <Textarea id="description" v-model="myaset.description" required="true" rows="3" cols="20" fluid /> -->
                </div>
            </div>
            <div>
                <label for="tgl" class="block font-bold mb-3">Tanggal</label>
                <DatePicker id="tgl" v-model.trim="myaset.tgl" required="true" :invalid="submitted && !myaset.tgl"
                    fluid />
                <!-- <small v-if="submitted && !myaset.tgl" class="text-red-500">Tanggal is required.</small> -->
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="$emit('closeDialog')" />
                <Button label="Save" icon="pi pi-check" @click="$emit('simpanData','coba param')" :param="myaset" />
            </template>
        </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const myasetDialog = ref(false);
const myasets = ref();
const myaset = ref({});

const props = defineProps({
    dialog : Boolean
})
const emit = defineEmits(["closeDialog","simpanData"])


</script>