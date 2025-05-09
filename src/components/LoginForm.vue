<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { usePageStore } from '../stores/usePageStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const pageStore = usePageStore();

const email = ref('');
const password = ref('');
const emailValid = ref(false);
const passwordValid = ref(false);
const emailTouched = ref(false);
const passwordTouched = ref(false);

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailValid.value = emailPattern.test(email.value);
};

const validatePassword = () => {
  passwordValid.value = password.value.length >= 8;
};

const isFormValid = computed(() => emailValid.value && passwordValid.value);

const onEmailInput = () => {
  emailTouched.value = true;
  validateEmail();
};

const onPasswordInput = () => {
  passwordTouched.value = true;
  validatePassword();
};

const showToast = (message, type = 'error') => {
  const toast = document.createElement('div');
  toast.className = `alert ${type === 'error' ? 'alert-error' : 'alert-success'} shadow-lg w-fit mx-auto`;
  toast.innerHTML = `
    <div>
      <span>${message}</span>
    </div>
  `;

  const container = document.getElementById('toast-container');
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};

const loginUser = () => {
  validateEmail();
  validatePassword();
  emailTouched.value = true;
  passwordTouched.value = true;

  if (isFormValid.value) {
    const result = userStore.login(email.value, password.value);
    if (result === 'Login successful') {
      showToast('Login successful!', 'success');
      setTimeout(() => {
        router.push('/dashbord');
      }, 1500);
    } else {
      showToast('Email or password is incorrect', 'error');
    }
  }
};
</script>


<template>
  <div id="toast-container" class="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 space-y-2"></div>
  <div class="lg:w-[388px] lg:space-y-[48px] w-[342px] space-y-[24px]">
    <div class="flex flex-col  space-y-[16px] lg:space-y-[28px]">
      <p class="lg:text-[36px] text-[24px] text-primaryt font-bold">Welcome Back 👋</p>
      <p class="lg:text-[20px] text-[15px] text-seccondt ">
        Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
      </p>
    </div>

    <form class="flex flex-col lg:gap-y-[24px] gap-y-[16px]">
      <div class="flex flex-col">
        <label class="mb-[8px] text-gray-700">Email</label>
        <input
          v-model="email"
          @input="onEmailInput"
          type="email"
          placeholder="Example@mail.com"
          class="lg:w-[388px] w-full bg-inputbg rounded-[8px] lg:rounded-[12px] h-[48px] placeholder:text-[16px] placeholder:text-placeh p-4 border border-inputborder focus:outline-none focus:ring-2 focus:ring-inputborder"
        />
        <p v-if="emailTouched && !emailValid" class="text-red-500 text-[14px] mt-[8px]">Email must contain "@" symbol</p>
      </div>

      <div class="flex flex-col">
        <label class="mb-[8px] text-gray-700">Password</label>
        <input
          v-model="password"
          @input="onPasswordInput"
          type="password"
          placeholder="At least 8 characters"
          class="lg:w-[388px] w-full bg-inputbg rounded-[8px] lg:rounded-[12px] h-[48px] placeholder:text-[16px] placeholder:text-placeh p-4 border border-inputborder focus:outline-none focus:ring-2 focus:ring-inputborder"
        />
        <p v-if="passwordTouched && !passwordValid" class="text-red-500 text-[14px] mt-[8px]">Password must be at least 8 characters</p>
        <p v-if="UserValid" class="text-red-500 text-[14px] mt-[8px]">Email or Password is incorrect</p>
      </div>

      <span class="text-right"><a href="#" class="text-blue-600 text-[14px] lg:text-[16px] hover:text-blue-800">Forgot Password?</a></span>

      <button
        @click="loginUser"
        type="button"
        class="lg:w-[388px] lg:h-[52px] h-[44px] w-full bg-loginbtn text-white rounded-[12px] text-[16px] lg:text-[20px] font-medium transition-colors duration-200"
      >
        Sign in
      </button>
    </form>

    <div class="flex items-center my-4">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="px-4 text-gray-500">Or</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <div class="lg:gap-y-[16px] flex lg:flex-col flex-row gap-x-[16px] align-middle justify-center items-center w-full">
      <button type="button" class="lg:w-[388px] lg:h-[52px] w-[163px] h-[40px] bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-[12px] text-[16px] flex flex-row justify-center items-center transition-colors duration-200">
        <img src="../assets/glogo.png" height="28" width="28" alt="Google logo">
        <p class="ml-[16px] font-medium hidden lg:block">Sign in with Google</p>
        <p class="ml-[16px] font-medium block lg:hidden">Google</p>

      </button>
      <button type="button" class="lg:w-[388px] lg:h-[52px] w-[163px] h-[40px] bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-[12px] text-[16px] flex flex-row justify-center items-center transition-colors duration-200">
        <img src="../assets/flogo.png" height="28" width="28" alt="Facebook logo">
        <p class="ml-[16px] font-medium hidden lg:block">Sign in with Facebook</p>
        <p class="ml-[16px] font-medium block lg:hidden">Facebook</p>
      </button>
    </div>
    <p class="text-[16px] lg:text-[18px] text-center text-gray-600 mt-[24px] lg:mt-[48px]">
        Don't you have an account?
        <button  class="text-blue-600 hover:text-blue-800" @click="goToRegister">Sign up</button>
      </p>
  </div>
</template>
