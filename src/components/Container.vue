<script setup>
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';
import { usePageStore } from '../stores/usePageStore';
const pageStore = usePageStore();

</script>

<template>
<div class="min-h-screen flex lg:flex-row items-center justify-center lg:px-[32px] lg:py-[32px] box-border overflow-hidden flex-col-reverse ">
  <div class="lg:w-[720px] w-[390px] flex items-center justify-center">
    <div v-if="pageStore.currentPage === 'login'">
      <LoginForm />
    </div>
    <div v-if="pageStore.currentPage === 'register'">
      <SignupForm />
    </div>    
  </div>

  <div class="lg:w-[720px] lg:h-[896px] w-[342px] h-[180px] my-[24px] ">
    <img src="../assets/bg2.jpg" class="lg:rounded-[24px] rounded-[20px]   object-cover w-full h-full" alt="Background">
  </div>
</div>

</template>

<style scoped>
</style>
