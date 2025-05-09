<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { usePageStore } from '../stores/usePageStore';

const pageStore = usePageStore();
const userStore = useUserStore();

const goToLogin = () => {
  pageStore.switchToLogin();
};


const username = ref('');
const email = ref('');
const password = ref('');
const usernameError = ref('');
const emailError = ref('');
const passwordError = ref('');

const validateUsername = computed(() => {
  if (username.value.length < 5) {
    usernameError.value = 'Username must be at least 5 characters';
  } else {
    usernameError.value = '';
  }
});

const validateEmail = computed(() => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email.value)) {
    emailError.value = 'Invalid email address';
  } else {
    emailError.value = '';
  }
});

const validatePassword = computed(() => {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordPattern.test(password.value)) {
    passwordError.value = 'Password must be at least 8 characters and contain both letters and numbers';
  } else {
    passwordError.value = '';
  }
});

const handleSubmit = (event) => {
  event.preventDefault();
  
  validateUsername.value;
  validateEmail.value;
  validatePassword.value;

  if (!usernameError.value && !emailError.value && !passwordError.value) {
    const registrationResult = userStore.register(username.value, email.value, password.value);
    alert(registrationResult);
    if (userStore.isLogged) {
      localStorage.setItem("isLogged", "true"); 
      pageStore.switchToLogin(); 
    }
  }
};

</script>

<template>
  <div class="lg:w-[388px] lg:space-y-[48px] w-[342px] space-y-[24px]">
    <div class="flex flex-col  space-y-[16px] lg:space-y-[28px]">
      <p class="lg:text-[36px] text-[24px] text-black font-bold">Welcome 👋</p>
      <p class="lg:text-[20px] text-[15px] text-gray-600">
        You can join us now !
      </p>
    </div>

    <form class="flex flex-col lg:gap-y-[24px] gap-y-[16px]">
      <div class="flex flex-col">
        <label class="mb-[8px] text-gray-700">Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="Example"
          class="lg:w-[388px] w-full bg-blue-100 rounded-[8px] lg:rounded-[12px] h-[48px] placeholder:text-[16px] placeholder:text-gray-400 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="validateUsername"
        />
        <p v-if="usernameError" class="text-red-500 text-sm">{{ usernameError }}</p>
      </div>

      <div class="flex flex-col">
        <label class="mb-[8px] text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Example@mail.com"
          class="lg:w-[388px] w-full bg-blue-100 rounded-[8px] lg:rounded-[12px] h-[48px] placeholder:text-[16px] placeholder:text-gray-400 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="validateEmail"
        />
        <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
      </div>

      <div class="flex flex-col">
        <label class="mb-[8px] text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="At least 8 characters"
          class="lg:w-[388px] w-full bg-blue-100 rounded-[8px] lg:rounded-[12px] h-[48px] placeholder:text-[16px] placeholder:text-gray-400 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="validatePassword"
        />
        <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
      </div>

      <button
      @click="handleSubmit"
  type="submit" 
  class="lg:w-[388px] lg:h-[52px] h-[44px] w-full bg-blue-800 hover:bg-blue-900 text-white rounded-[12px] text-[20px] font-medium transition-colors duration-200"
  
>
  Sign up
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
      have an account?
        <button class="text-blue-600 hover:text-blue-800" @click="goToLogin">Login</button>
      </p>
  </div>
</template>
