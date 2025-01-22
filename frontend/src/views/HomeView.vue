<template>
  <main>
    <div class="grid">
      <aside class="col-2">
        <div class="text-center p-3 border-round-sm bg-blue-100 font-bold">
          Filter</div>
      </aside>
      <section class="col-10">
        <div class="p-3 border-round-sm  bg-blue-50">
          <div class="flex justify-content-between">
            <h2 class="text-4xl text primary"> List Question</h2>
            <Button label="Tambah" rounded type="button" icon="pi pi-plus" @click="dialog=true"></Button>
          </div>
          <Dialog v-model:visible="dialog" modal header="Edit Profile" :style="{ width: '70%' }">
          <FormQuestion  @close="closeDialog()"/>
          </Dialog>

          <ListQuestion />
          <ListQuestion />
          <ListQuestion />
          <ListQuestion />
        </div>


      </section>

    </div>

  </main>
</template>

<script setup>
import ListQuestion from '@/components/Question/ListQuestion.vue';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';
import FormQuestion from '@/components/Question/FormQuestion.vue';

const dialog=ref(false)

const closeDialog =()=>{
  dialog.value = false
}

</script>
