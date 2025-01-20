<template>
    <div>
        <Menubar class="bg-blue-300" :model="items">
            <template #end>
                <Button label="Login"  v-if="!authStores.currentUser" icon="pi pi-user" @click="dialog = true" />
                <div v-else>
                    <Button label="Dashboard" icon="pi pi-home" @click="dasboard"></Button>
                    <Button label="Logout" class="ml-3" 
                    severity="danger"  @click="LogoutUser"></Button>

                </div>
            </template>
        </Menubar>        
    </div>
    <FormAuthDialog  v-model:visible = "dialog" />
    
</template>
 
<script setup>
import Menubar from "primevue/menubar";
import { ref } from "vue";
import FormAuthDialog from "@/components/FormAuthDialog.vue";
import { useAuthStore } from "@/stores/authStores";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const authStores=useAuthStore()

//action
const {LogoutUser} = useAuthStore();

//state pinia
const {dialog} =storeToRefs(authStores);
//state
//const visible = ref(false)
const router = useRouter()
function dasboard() {
    router.push({name: 'Dashboard'});
}

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push({name: 'home'});
        }
        
    },
    {
        label: 'Features',
        icon: 'pi pi-star',
        route : "/"
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
    },
    {
        label: 'Dev',
        icon: 'pi pi-home',
        command: () => {
            router.push({name: 'Dev'});
        }
        
    },
]);
</script>
