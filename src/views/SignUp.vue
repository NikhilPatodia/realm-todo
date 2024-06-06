<template>
  <div class="signup-form">
    <h2>Sign Up Form</h2>
    <form @submit.prevent="handleLogin">
       <label for="first">First Name:</label>
      <input v-model="first" @input="handleOnChange('first')" type="text" id="first" name="first" placeholder="Your first name.." required>
      <p class="color-red" v-if="firstError">{{ firstError }} </p>

      <label for="last">Last Name:</label>
      <input v-model="last" @input="handleOnChange('last')" type="text" id="last" name="last" placeholder="Your last name.." required>
      <p class="color-red" v-if="lastError">{{ lastError }} </p>
      
      <label for="email">Email:</label>
      <input v-model="email" @change="handleOnChange('email')" type="email" id="email" name="email" placeholder="Your email.." required>
      <p class="color-red" v-if="emailError">{{ emailError }} </p>
      <p class="color-red" v-if="loginError">{{ loginError }} </p>
      
      <label for="password">Password:</label>
      <input v-model="password" @change="handleOnChange('password')" type="password" id="password" name="password" placeholder="Your password.." required>
      <p class="color-red" v-if="passwordError">{{ passwordError }} </p>
      <button type="submit">create Account</button>
      <!-- <p>If You have not accoutnt?<router-link :to="{name: 'signup'}">create Account.</router-link></p> -->
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import checkForm from '../composables/checkForm.js'
import {useAppState} from '../realmState.js'
export default {
  setup() {
     const {email, first, last, password,handleOnChange, firstError, lastError, emailError, passwordError} = checkForm();
    const router = useRouter();
    const { signup, loginError } = useAppState();
    const handleLogin = async()=>{
        if(first.value === ""){
          firstError.value = "First Name is Empty!"
        }
        else if(last.value === ""){
          lastError.value = "Last Name is Empty!";
        }
        else if(email.value === ""){
          emailError.value = "Email Address is Empty!";
        }
        else if(password.value === ""){
          passwordError.value = "Password is Empty!";
        }
        else{

        const success = await signup(first.value, last.value, email.value, password.value);
         if(success){
          router.replace('/');
          } 
        }
    }

    return {handleLogin, first, last, email, password, handleOnChange, firstError, lastError, emailError, passwordError, loginError}
  }
};
</script>

<style>
/* body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
} */
.color-red{
  color: red;
}
.signup-form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signup-form h2 {
  margin-bottom: 20px;
}

.signup-form input[type="text"],
.signup-form input[type="email"],
.signup-form input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.signup-form button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.signup-form button:hover {
  background-color: #45a049;
}
</style>
