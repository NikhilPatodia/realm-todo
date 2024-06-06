
import { ref } from 'vue'
const checkForm = ()=>{
    
    const first = ref('')
    const last = ref('')
    const email = ref('');
    const firstError = ref('');
    const lastError = ref('');
    const emailError = ref('');
    const hasNumber = ref(/\d/);
    const hasEmail = ref(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const hasPassword = ref(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    const password = ref('');
    const passwordError = ref('');
    const handleOnChange = (value)=>{
       
        if(value === 'first'){
      
         if(first.value.includes(' ')){
             firstError.value = "Text Contains Space.";
             validate.value = true;
         }
         else if(hasNumber.value.test(first.value)){
            firstError.value = "Text Contains Number.";
         }
         else{
        firstError.value = '';
         }
      }
      else if(value === 'last'){
         
         if(last.value.includes(' ')){
             lastError.value = "Text Contains Space."
         }
         else if(hasNumber.value.test(last.value)){
            lastError.value = "Text Contains Number."
         }
         else{
        lastError.value = '';
         }
      }
      else if(value === 'email'){
        if(email.value.includes(' ')){
          emailError.value = "Your Email is contains space.";
       }
        else if(!(hasEmail.value.test(email.value))){
            emailError.value = "Your Email is Not Valid.";
         }
         else{
            emailError.value = '';
         }
      }
      else if(value === "password"){
        if(password.value.includes(' ')){
            passwordError.value = "Your password is contains space.";
         }
          else if(!(hasPassword.value.test(password.value))){
            passwordError.value = "Password Must Contains At least 8 characters long, At least one uppercase letter, At least one lowercase letter, At least one digit, At least one special character (e.g., !@#$%^&*)";
           }
           else{
            passwordError.value = '';
           }
    }
    }
   
  
    return {first, last, handleOnChange, firstError, lastError, emailError, email, password, passwordError}
}

export default checkForm