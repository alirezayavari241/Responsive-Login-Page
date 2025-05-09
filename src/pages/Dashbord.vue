<script setup>
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

function logout() {
  userStore.isLogged = false;
  localStorage.setItem('isLogged', 'false');
  router.push('/');
}
</script>

<template>
  <div>
    <h2>Dashboard</h2>
    <button @click="logout" class="bg-red-600 rounded-md text-white p-3 ">Log out</button>
  </div>
</template>

<style scoped>

</style>
