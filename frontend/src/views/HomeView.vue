<template>
  <main>
    <div class="grid">
      <aside class="col-2">
        <div class="text-center p-3 border-round-sm bg-blue-100 font-bold" >
          Filter</div>
      </aside>
      <section class="col-10">
        <div class="p-3 border-round-sm  bg-blue-50">
          <div class="flex justify-content-between">
            <h2 class="text-4xl text primary"> List Question</h2>
            <Button label="Tambah" rounded type="button" icon="pi pi-plus"></Button>
          </div>
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

</script>
