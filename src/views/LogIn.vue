<template>
  <div class="signup-form">
    <h2>Log In Form</h2>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input v-model="email" @input="clearEmailError" type="email" id="email" name="email" placeholder="Your email.." required>
      <p class="color-red" v-if="emailError">{{ emailError }}</p>
      <p class="color-red" v-if="loginError">{{ loginError }}</p>

      <label for="password">Password:</label>
      <input v-model="password" @input="clearPasswordError" type="password" id="password" name="password" placeholder="Your password.." required>
      <p class="color-red" v-if="passwordError">{{ passwordError }}</p>

      <button type="submit">Log In</button>

      <!-- Google Sign-In Button -->
      <div id="g_id_onload"
           data-client_id="104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com"
           data-context="signin"
           data-callback="handleCredentialResponse"
           data-itp_support="true">
      </div>
      <div class="g_id_signin"
           data-type="standard"
           data-size="large"
           data-theme="outline"
           data-text="sign_in_with"
           data-logo_alignment="left">
      </div>

      <!-- Facebook Login Button -->
      <div class="fb-login-button" 
           data-width="" 
           data-size="large" 
           data-button-type="login_with" 
           data-layout="default" 
           data-auto-logout-link="false" 
           data-use-continue-as="false" 
           data-onlogin="checkLoginState"></div>
      
      <p>If you don't have an account? <router-link :to="{ name: 'signup' }">Create Account</router-link></p>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useAppState } from '../realmState.js';
import checkForm from '../composables/checkForm.js';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const { email, password, emailError, passwordError } = checkForm();
    const router = useRouter();
    const { login, handleGoogleLogin, loginError, loginFacebook } = useAppState();

    const clearEmailError = () => {
      emailError.value = '';
    };

    const clearPasswordError = () => {
      passwordError.value = '';
    };

    const handleLogin = async () => {
      if (email.value === "") {
        emailError.value = "Email Address is Empty!";
      } else if (password.value === "") {
        passwordError.value = "Password is Empty!";
      } else {
        await login(email.value, password.value);
        if (!loginError.value) {
          emailError.value = "";
          passwordError.value = "";
          router.replace('/');
        }
      }
    };

    const handleCredentialResponse = async (response) => {
      await handleGoogleLogin(response);
      if (!loginError.value) {
        router.replace('/');
      }
    };

    const checkLoginState = () => {
      FB.getLoginStatus(response => {
        statusChangeCallback(response);
      });
    };

    const statusChangeCallback = async(response) => {
      if (response.status === 'connected') {
       const { accessToken } = FB.getAuthResponse();
        const success = await loginFacebook(accessToken);
        if (success) {
          router.replace('/');
        }
        console.log('Logged in.');
        // Handle successful login
      } else {
        console.log('Not authenticated.');
        loginError.value = "User is not authenticated.";
      }
    };

    onMounted(() => {
      window.handleCredentialResponse = handleCredentialResponse;
      window.checkLoginState = checkLoginState;  // Make checkLoginState globally accessible

      window.fbAsyncInit = function() {
        FB.init({
          appId: "438289569066138",
          cookie: true,
          xfbml: true,
          version: 'v20.0'
        });

        FB.AppEvents.logPageView();
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });

    return {
      handleLogin,
      email,
      password,
      emailError,
      passwordError,
      handleCredentialResponse,
      loginError,
      clearEmailError,
      clearPasswordError,
      checkLoginState
    };
  }
};
</script>

<style>
/* Your CSS styles */
.color-red {
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


<style>
/* Your CSS styles */
.color-red {
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
