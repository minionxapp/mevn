<template>
    <Dialog v-model:visible="props.dialog" :style="{ width: '450px' }" header="Myaset Details" :modal="true">
           <div class="flex flex-col gap-6">
               <!-- <img v-if="myaset.image" :src="`https://primefaces.org/cdn/primevue/images/myaset/${myaset.image}`"
                   :alt="myaset.image" class="block m-auto pb-4" /> -->
               <div>
                   <label for="name" class="block font-bold mb-3">Label</label>
                   <InputText id="name" v-model.trim="props.data.label" required="true" fluid />
               </div>
               <div>
                   <label for="value" class="block font-bold mb-3">Value</label>
                   <InputText id="Value" v-model.trim="props.data.value" required="true" fluid />
               </div>
           </div>
           
           <template #footer>
               <Button label="Cancel" icon="pi pi-times" text @click="$emit('closeDialog',data)" />
               <Button label="Save" icon="pi pi-check" @click="$emit('handleSubmit',data)" />
           </template>
           <!-- {{ props.data._id }} -->
       </Dialog>
</template>

<script setup>
// import { onMounted, ref } from 'vue';
// import custumFetch from '@/api';

// const myasetDialog = ref(false);
// const myasets = ref();
// const data = ref({});

const props = defineProps({
   dialog : Boolean,
   action : String,
   data : {
    type: Object,

   }
})
const emit = defineEmits(["closeDialog","simpanData","handleSubmit"])


</script>