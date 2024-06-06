import * as Realm from "realm-web";
import {computed, ref} from "vue";
import { useRouter } from 'vue-router';
import { jwtDecode } from "jwt-decode";
// import { MongoClient } from 'mongodb'; 
const app = Realm.getApp("application-1-yyltwyf");
const router = useRouter();
const userDetail = ref([]);
const todoData = ref();
const forTodo = ref([]);
const forProgress = ref([]);
const forComplete = ref([]);
const user = ref(null);
const loginError = ref("");
user.value = app?.currentUser;
export const useAppState = ()=>{
    const isLoggedIn = computed(() => user.value !== null);
    const changeTask = async(type, currentTrack, id, title, desc)=>{
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("todo-app").collection("todo-detail");
         if (!collection) {
             throw new Error("Failed to connect to the collection");
         }
 
        
          if(type === "right" && currentTrack === "Todo"){
            await collection.updateOne({_id: id}, {$set: {track:'Progress'}})
            forTodo.value = forTodo.value.filter((elem)=>{return (JSON.parse(JSON.stringify(elem._id)) !== JSON.parse(JSON.stringify(id)))});
            forProgress.value.push({_id: id,  title: title, desc: desc, userID: app.currentUser.id, track: 'Progress' })
          }
          else if(type === "left" && currentTrack === "Progress"){
            await collection.updateOne({_id: id}, {$set: {track:'Todo'}})
            forProgress.value = forProgress.value.filter((elem)=>{return (JSON.parse(JSON.stringify(elem._id)) !== JSON.parse(JSON.stringify(id)))});
            forTodo.value.push({_id: id,  title: title, desc: desc, userID: app.currentUser.id, track: 'Todo' })
          }
          else if(type === "right" && currentTrack === "Progress"){
            await collection.updateOne({_id: id}, {$set: {track:'Completed'}})
            forProgress.value = forProgress.value.filter((elem)=>{return (JSON.parse(JSON.stringify(elem._id)) !== JSON.parse(JSON.stringify(id)))});
            forComplete.value.push({_id: id,  title: title, desc: desc, userID: app.currentUser.id, track: 'Completed' })
          }
          else if(type === "left" && currentTrack === "Completed"){
            await collection.updateOne({_id: id}, {$set: {track:'Progress'}})
            forComplete.value = forComplete.value.filter((elem)=>{return (JSON.parse(JSON.stringify(elem._id)) !== JSON.parse(JSON.stringify(id)))});
            forProgress.value.push({_id: id,  title: title, desc: desc, userID: app.currentUser.id, track: 'Progress' })
          }
         
            // Refresh the current user data
            await app.currentUser.refreshCustomData();
  
            // Assuming `user` is a reactive variable (e.g., in Vue.js)
            user.value = app.currentUser;
     }
      
    
    const defaultData = async()=>{
         const mongodb = app.currentUser.mongoClient("mongodb-atlas");
          const collection = mongodb.db("todo-app").collection("todo-detail");

         todoData.value = await collection.find({userID: app.currentUser.id});
         forTodo.value = todoData.value.filter((elem)=>{return elem.track === "Todo"});
         forProgress.value = todoData.value.filter((elem)=>{return elem.track === "Progress"});
         forComplete.value = todoData.value.filter((elem)=>{return elem.track === "Completed"});
          // Refresh the current user data
          await app.currentUser.refreshCustomData();
  
          // Assuming `user` is a reactive variable (e.g., in Vue.js)
          user.value = app.currentUser;
          return true;
    }
    
    const addTodo = async (title, desc) => {
      try {
        
          const mongodb = app.currentUser.mongoClient("mongodb-atlas");
          const collection = mongodb.db("todo-app").collection("todo-detail");
  
          if (!collection) {
              throw new Error("Failed to connect to the collection");
          }
  
          // Insert the todo item
          await collection.insertOne({ title: title, desc: desc, userID: app.currentUser.id, track: 'Todo' });
          todoData.value.push({ title: title, desc: desc, userID: app.currentUser.id, track: 'Todo' });

          forTodo.value = await collection.find({track: "Todo", userID:app.currentUser.id});
          // Refresh the current user data
          await app.currentUser.refreshCustomData();
  
          // Assuming `user` is a reactive variable (e.g., in Vue.js)
          user.value = app.currentUser;
          
          return true;
      } catch (err) {
          alert("Failed to add todo due to: " + err.message);
          return false;
      }
  };
    const editTodo = async(title, desc, id, type)=>{
      try {
        
         const mongodb = app.currentUser.mongoClient("mongodb-atlas");
         const collection = mongodb.db("todo-app").collection("todo-detail");
 
         if (!collection) {
             throw new Error("Failed to connect to the collection");
         }
 
         // Insert the todo item
         await collection.updateOne({_id: id}, {$set: { title: title, desc: desc, userID: app.currentUser.id }})
         if(type === "Todo"){
          forTodo.value  = forTodo.value.map((elem)=>{
            if(JSON.parse(JSON.stringify(elem._id)) === JSON.parse(JSON.stringify(id))){
                 elem.title = title;
                 elem.desc = desc;
            }
            return elem;
       })
         }
         else if(type === "Progress"){
          forProgress.value  = forProgress.value.map((elem)=>{
            if(JSON.parse(JSON.stringify(elem._id)) === JSON.parse(JSON.stringify(id))){
                 elem.title = title;
                 elem.desc = desc;
            }
            return elem;
       })
         }
         else{
          forComplete.value  = forComplete.value.map((elem)=>{
            if(JSON.parse(JSON.stringify(elem._id)) === JSON.parse(JSON.stringify(id))){
                 elem.title = title;
                 elem.desc = desc;
            }
            return elem;
       })
         }
       
         // Refresh the current user data
         await app.currentUser.refreshCustomData();
 
         user.value = app.currentUser;
 
         return true;
     } catch (err) {
         alert("Failed to add todo due to: " + err.message);
         return false;
     }
    }
    const deleteTodo = async(id, type)=>{
      try {
        
         const mongodb = app.currentUser.mongoClient("mongodb-atlas");
         const collection = mongodb.db("todo-app").collection("todo-detail");


 
         if (!collection) {
             throw new Error("Failed to connect to the collection");
         }
 
         // Insert the todo item
         await collection.deleteOne({_id: id})
         if(type === "Todo"){
          forTodo.value = forTodo.value.filter((elem)=>{return (JSON.parse(JSON.stringify(elem._id)) !== JSON.parse(JSON.stringify(id)))});
         }
         else if(type === "Progress"){
          forProgress.value = forProgress.value.filter((elem)=>{return (JSON.parse(JSON.stringify(elem._id)) !== JSON.parse(JSON.stringify(id)))});
         }
         else{
          forComplete.value = forComplete.value.filter((elem)=>{return (JSON.parse(JSON.stringify(elem._id)) !== JSON.parse(JSON.stringify(id)))});
         }
         
         // Refresh the current user data
         await app.currentUser.refreshCustomData();
 
         // Assuming `user` is a reactive variable (e.g., in Vue.js)
         user.value = app.currentUser;
 
         return true;
     } catch (err) {
         alert("Failed to add todo due to: " + err.message);
         return false;
     }
    }
    const logout = async()=>{
      
        google.accounts.id.disableAutoSelect();
        await reinitializeGoogleSignIn()
      //   const logoutIframe = document.createElement('iframe');
      // logoutIframe.src = 'https://accounts.google.com/Logout';
      // logoutIframe.style.display = 'none';
      // document.body.appendChild(logoutIframe);
        await app?.currentUser.logOut();
        user.value = null;
        return true;
    }
    const reinitializeGoogleSignIn = () => {
      // Remove the existing Google Sign-In button to avoid duplicates
      const googleButtonContainer = document.querySelector('.g_id_signin');
      if (googleButtonContainer) {
          googleButtonContainer.innerHTML = '';
      }
      // Reinitialize the Google Sign-In button
      google.accounts.id.initialize({
          client_id: '104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com',
          callback: handleGoogleLogin,
          context: 'signin',
          itp_support: true
      });
      google.accounts.id.renderButton(
          document.querySelector('.g_id_signin'),
          { theme: 'outline', size: 'large' }
      );
  }
 
    const login = async(email, password)=>{
        
         try{
          // const res = await GoogleSignIn();
          // const ID = res.idToken;
        
             //Log In user
             const credentials = Realm.Credentials.emailPassword(email, password);
             console.log(await app.logIn(credentials));   
             // Refresh the current User Data
             await app?.currentUser?.refreshCustomData();
        
  
          // Set the user value
          user.value = app?.currentUser;
          loginError.value = "";
          return true;
        } catch (error) {
           // Check if the error message indicates invalid credentials
        if (error.message && error.message.toLowerCase().includes('invalid username/password')) {
          // Custom error for invalid credentials
          loginError.value = "Invalid username or password. Please check your credentials.";
          setTimeout(()=>{loginError.value = ""},1200)
      } else {
          // For other errors, rethrow the original error
          throw error;
      }
      }
    }
    const handleGoogleLogin = async(response) => {
      const idToken = response.credential;
      try {
        // Authenticate with MongoDB Realm using Google credentials
        const googleCredentials = Realm.Credentials.google({ idToken });
        // Decode the ID token to get user information
  const decoded = jwtDecode(idToken);

  // Extract the email from the decoded token
  const googleEmail = decoded.email;

  // const credentials = Realm.Credentials.emailPassword(googleEmail, password);
  const googleLogin = await app.logIn(googleCredentials);
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongodb.db("todo-app").collection("all-todo");
  const validUser = collection.findOne({email: googleLogin.profile.email})
  if(validUser){
        // Refresh the current User Data
  await app?.currentUser?.refreshCustomData();


  // Set the user value
  user.value = app?.currentUser;
  loginError.value = "";
  console.log(loginError.value)
  return true;
  }else{
    loginError.value = "Error during Google authentication. Please try again.";
    setTimeout(() => { loginError.value = ""; }, 1200);
  }


 

  // Handle successful authentication (e.g., redirect to home page)
} catch (error) {
  loginError.value = "Error during Google authentication. Please try again.";
  setTimeout(() => { loginError.value = ""; }, 1200);
}
    }
    const loginFacebook = async (accessToken) => {
      try {
        const credentials = Realm.Credentials.facebook(accessToken);
        const facebookUser = await app.logIn(credentials);
        console.log(facebookUser)
        
        user.value = app.currentUser;
        await app?.currentUser?.refreshCustomData();
        loginError.value = "";
        return true;
      } catch (error) {
        loginError.value = "Error during Facebook authentication. Please try again.";
        return false;
      }
    };
   const signup = async(first, last, email, password)=>{
     try {
        //SignUp user
        const credentials = Realm.Credentials.emailPassword(email, password);  
        await app.emailPasswordAuth.registerUser({email: email, password: password});

        //Authenticate the user
        await app.logIn(credentials);

        //save profile information

        const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
        const collection = mongodb?.db("todo-app").collection("all-todo");
        await collection?.insertOne({email:email, password: password, first: first, last: last, userID: app?.currentUser?.id})
        // Refresh the current User Data

        await app?.currentUser?.refreshCustomData();
        user.value = app.currentUser;
        loginError.value = "";
        return true;
     } catch (error) {
               // Check if the error message indicates invalid credentials
               if (error.message && error.message.toLowerCase().includes('name already in use')) {
                // Custom error for invalid credentials
                loginError.value = "Email already exists. Please use a different email address.";
                setTimeout(()=>{loginError.value = ""},1200)
            } else {
                // For other errors, rethrow the original error
                throw error;
            }
        return false;
     }
   } 

   return {isLoggedIn, login, logout, signup, user, addTodo, todoData, defaultData, editTodo, deleteTodo, changeTask, forTodo, forComplete, forProgress, loginError, handleGoogleLogin, app, reinitializeGoogleSignIn, loginFacebook} 
}


// client_id = 373561964740-42ijkaom3e6jvlatmffvh4tkq0jminos.apps.googleusercontent.com

// client_secret = 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