<template>
  <ConfirmDialog></ConfirmDialog>
  <section class="col-12">
    <div class="p-2 border-round-sm  bg-blue-50">
      <div class="card flex flex-wrap  gap-2 justify-center" style="float: right;">
        <h1 class="text-sm text primary">Nama Kelas : </h1>
        <InputText id="search" aria-describedby="desc-help" v-model="cariData" />
        <Button label="Cari" rounded type="button" icon="pi pi-search" @click="cari({cariData})"></Button>
        <Button label="Tambah" rounded type="button" icon="pi pi-plus" @click="tambah()"></Button>
      </div>
      <Dialog v-model:visible="dialog" modal header="Add Kelas" :style="{ width: '70%' }">
        <FormKelasComponent @close="closeDialog()" @reload="allKelases()" :data=kelasId />
      </Dialog>
      <ListKelasComponent :data=kelases  @hapus="hapus" @edit="edit" @show="show" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import Dialog from 'primevue/dialog';
import custumFetch from '@/api';
import { useAuthStore } from '@/stores/authStores';
import LoadingSpinner from '@/components/Question/LoadingSpinner.vue';

import ListKelasComponent from '@/components/Kelas/ListKelasComponent.vue';
import FormKelasComponent from '@/components/Kelas/FormKelasComponent.vue';

import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const dialog = ref(false)
const kelases = ref(null)
const cariData = ref('');
const kelasId = ref('')



const closeDialog = () => {
  dialog.value = false
}

const allKelases = async () => { 
  allKelas() 
}

const allKelas = async () => {
  try {
    const { data } = await custumFetch.get("/kelas")
    kelases.value = data.data
  } catch (error) {
    alert(error.response.data.message)
  }
}

const hapusData = async (id) => {
  await custumFetch.delete("/kelas/" + id)
  await allKelases();
  alert("Hapus Data Berhasil......")
}

const edit = async(id) => {
  const {data} =  await custumFetch.get("/kelas/" + id)
  kelasId.value = data.data
    dialog.value = true
}


const tambah = async(id) => {
  kelasId.value = null
  dialog.value = true
}
const show = (id) => {
  alert("Show : " + id)
}

const cari = async (id) => {
  if (cariData.value == '') {
    allKelas()
  } else {
    const {data} =  await custumFetch.get("/kelas/carikelas/" + cariData.value)
    kelases.value = data.data
  }
}

onMounted(() => {
  allKelas()
})

const confirm = useConfirm();
const hapus = (id) => {
    confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
             hapusData(id)
        },
        reject: () => {
        }
    });
};

</script>