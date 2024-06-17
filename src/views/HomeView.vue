<template>

    <div class="todo-container">
        <h1 class="title">To-Do List</h1>
        <form @submit.prevent="addtodo">
        <div class="input-section">
            <input @input="handleChange" v-model="title" type="text" id="new-task" placeholder="Add a new task...">
            <span class="color-red" v-if="titleError"> {{ titleError }} </span>
             <textarea v-model="desc" id="new-text" placeholder="Add Description"></textarea>
        </div>
            <button :disabled="isProcessing" type="submit" class="addTask" id="add-task-button">Add</button>
         </form>   

         <div class="searchBar">
          <input v-model="search" type="text" placeholder="Search by keyword....">
          <button @click="handleSearch" class="btn">Search</button>
          <button v-if="validSearch" @click="BackToLobby" class="btn ml-12">Back</button>
         </div>
        <!-- <div v-if="todoData"> 
        <ul v-for="todo in todoData" :key="todo._id" class="task-list" >
          <div class="li"> <div> <p ><span class="color-black">title: </span> {{ todo.title }} </p> <p><span class="color-black">desc: </span>{{ todo.desc }} </p></div> <div class="imgs"> </div> </div>
        </ul>
        </div> -->
        <div v-if="todoData && !showError" class="container">
        <div class="column" id="todo">
         <div @mouseenter="todoArrow = true" @mouseleave="todoArrow = false" class="card-header">
            <h2 >To-Do</h2>
            <div v-if="todoArrow" class="arrows forTodo">
             
              <img @click="handleSorting('todoUp')" v-if="todoUp" src="../icons/up.png" alt="">
              <img @click ="handleSorting('todoDown')" v-else src="../icons/down.png" alt="">
            </div>
         </div>   
           <div v-if="!validForTodo">  
            <ul v-for="todo in forTodo" :key="todo._id">
               <li v-if="todo.track === 'Todo'"><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Todo')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Todo')" src="../icons/delete.svg" alt=""></p><img @click="changeTask('right', 'Todo', todo._id, todo.title, todo.desc)" class="right-arrow" src="../icons/right.png" alt=""></li>
                
            </ul>
            </div>
            <div v-else>
               <ul   v-for="todo in newTodo" :key="todo._id">
               <li v-if="todo.track === 'Todo'"><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Todo')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Todo')" src="../icons/delete.svg" alt=""></p><img @click="changeTask('right', 'Todo', todo._id, todo.title, todo.desc)" class="right-arrow" src="../icons/right.png" alt=""></li>
                
            </ul>
            </div>
        </div>
        <div  class="column" id="inprogress">
           <div @mouseenter="progressArrow = true" @mouseleave="progressArrow = false" class="card-header">
            <h2>In-Progress</h2>
            <div v-if="progressArrow" class="arrows forProgress">
              <img @click="handleSorting('progressUp')" v-if="progressUp" src="../icons/up.png" alt="">
              <img @click="handleSorting('progressDown')" v-else src="../icons/down.png" alt="">
            </div>
         </div>
            <div v-if="!validForProgress">
             <ul  v-for="todo in forProgress" :key="todo._id">
               <li v-if="todo.track === 'Progress'"><img @click="changeTask('left', 'Progress', todo._id,todo.title, todo.desc)" class="left-arrow" src="../icons/left.png" alt=""><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Progress')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Progress')" src="../icons/delete.svg" alt=""></p><img @click="changeTask('right', 'Progress', todo._id,todo.title, todo.desc)" class="right-arrow" src="../icons/right.png" alt=""></li>
                
            </ul>
           </div> 
          <div v-else>
            <ul  v-for="todo in newProgress" :key="todo._id">
               <li v-if="todo.track === 'Progress'"><img @click="changeTask('left', 'Progress', todo._id,todo.title, todo.desc)" class="left-arrow" src="../icons/left.png" alt=""><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Progress')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Progress')" src="../icons/delete.svg" alt=""></p><img @click="changeTask('right', 'Progress', todo._id,todo.title, todo.desc)" class="right-arrow" src="../icons/right.png" alt=""></li>
                
            </ul>
          </div> 
        </div>
        <div class="column" id="complete">
          <div @mouseenter="completeArrow = true" @mouseleave="completeArrow = false" class="card-header">
            <h2>Complete</h2>
            <div v-if="completeArrow" class="arrows forComplete">
              <img @click="handleSorting('completeUp')" v-if="completeUp" src="../icons/up.png" alt="">
              <img @click="handleSorting('completeDown')" v-else src="../icons/down.png" alt="">
            </div>
         </div>
            <div v-if="!validForCompleted">
             <ul  v-for="todo in forComplete" :key="todo._id">
               <li v-if="todo.track === 'Completed'"><img @click="changeTask('left', 'Completed', todo._id,todo.title, todo.desc)" class="left-arrow" src="../icons/left.png" alt=""><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Completed')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Completed')" src="../icons/delete.svg" alt=""></p></li>
                
            </ul>
            </div>
           <div v-else>
                <ul  v-for="todo in newComplete" :key="todo._id">
               <li v-if="todo.track === 'Completed'"><img @click="changeTask('left', 'Completed', todo._id,todo.title, todo.desc)" class="left-arrow" src="../icons/left.png" alt=""><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Completed')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Completed')" src="../icons/delete.svg" alt=""></p></li>
                
            </ul>
          </div>   
        </div>
    </div>
    <div v-if="showError">

      <span class="color-red">{{ showError }}</span>
    </div>
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
</template>
<script>

import {useAppState} from '../realmState.js'
import {onMounted, ref, watch} from "vue"

export default {
  setup() {
    const title = ref("");
    const titleError = ref("")
    const desc = ref("");
    const type = ref("");
    const valid = ref(false);
    const todo_id = ref(null);
    const todoArrow = ref(false)
    const progressArrow = ref(false)
    const completeArrow = ref(false)
    const todoUp = ref(true);
    const progressUp = ref(true);
    const completeUp = ref(true);
  
    const isProcessing = ref(false);
    const {addTodo, todoData, defaultData, editTodo, deleteTodo, changeTask, forTodo, forComplete, forProgress,handleSearch,validForTodo, validForProgress, validForCompleted, newTodo, newProgress, newComplete, search,validSearch, BackToLobby, showError, loginFacebook} = useAppState();
          const checkLoginState = () => {
     FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});;
    };

    const statusChangeCallback = async(response) => {
      console.log("This is Response: " + response);
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
    }
    onMounted(async()=>{
      await defaultData();
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
    })
    const edit = (tit, des, id, typo)=>{
      
      title.value = tit;
      desc.value = des;
      type.value = typo
      valid.value = true;
      todo_id.value = id;
      titleError.value = "";
        
    }
    const handleChange = ()=>{
       if(title.value === ""){
        titleError.value = "Title Field not be Empty!";
      }
       else{
        titleError.value = "";
      }
    }
    const deleteId = async(id, typo)=>{
    type.value = typo;
     await deleteTodo(id, type.value);
     
     valid.value = false;
    }
   
    const addtodo = async()=>{
      isProcessing.value = true;
      if(title.value === ""){
        titleError.value = "Title Field not be Empty!";
        isProcessing.value = false;
      }
     
      else{
        if(valid.value){
         editTodo(title.value, desc.value, todo_id.value, type.value);
         valid.value = false;
        }
        else{
          await addTodo(title.value, desc.value);
         
          }
           title.value = "";
          desc.value = "";
      titleError.value = "";
      isProcessing.value = false;   
      }

    }
   const handleSorting = (type)=>{
    if(type === "todoUp"){
      forTodo.value.sort((a, b)=>{
        if(a.title > b.title){
          return 1;
        }else if(a.title < b.title){
          return -1;
        }
        return 0;
      });
      newTodo.value.sort((a, b)=>{
        if(a.title > b.title){
          return 1;
        }else if(a.title < b.title){
          return -1;
        }
        return 0;
      });
      todoUp.value = false;
    }
    else if(type === "todoDown"){
         forTodo.value.sort((a, b)=>{
        if(a.title < b.title){
          return 1;
        }else if(a.title > b.title){
          return -1;
        }
        return 0;
      });
         newTodo.value.sort((a, b)=>{
        if(a.title < b.title){
          return 1;
        }else if(a.title > b.title){
          return -1;
        }
        return 0;
      });
      todoUp.value = true;
    }
   else if(type === "progressUp"){
      forProgress.value.sort((a, b)=>{
        if(a.title > b.title){
          return 1;
        }else if(a.title < b.title){
          return -1;
        }
        return 0;
      });
      newProgress.value.sort((a, b)=>{
        if(a.title > b.title){
          return 1;
        }else if(a.title < b.title){
          return -1;
        }
        return 0;
      });
      progressUp.value = false;
    }
    else if(type === "progressDown"){
         forProgress.value.sort((a, b)=>{
        if(a.title < b.title){
          return 1;
        }else if(a.title > b.title){
          return -1;
        }
        return 0;
      });
         newProgress.value.sort((a, b)=>{
        if(a.title < b.title){
          return 1;
        }else if(a.title > b.title){
          return -1;
        }
        return 0;
      });
      progressUp.value = true;
    }
   else if(type === "completeUp"){
      forComplete.value.sort((a, b)=>{
        if(a.title > b.title){
          return 1;
        }else if(a.title < b.title){
          return -1;
        }
        return 0;
      });
      newComplete.value.sort((a, b)=>{
        if(a.title > b.title){
          return 1;
        }else if(a.title < b.title){
          return -1;
        }
        return 0;
      });
      completeUp.value = false;
    }
    else if(type === "completeDown"){
         forComplete.value.sort((a, b)=>{
        if(a.title < b.title){
          return 1;
        }else if(a.title > b.title){
          return -1;
        }
        return 0;
      });
         newComplete.value.sort((a, b)=>{
        if(a.title < b.title){
          return 1;
        }else if(a.title > b.title){
          return -1;
        }
        return 0;
      });
      completeUp.value = true;
    }
   }

    return {  title, desc , addtodo, todoData, titleError, handleChange, edit, deleteId, changeTask, forTodo, forComplete, forProgress, isProcessing, search, handleSearch, validSearch,validForTodo, validForProgress, validForCompleted, newTodo, newProgress, newComplete, BackToLobby, todoArrow, progressArrow, completeArrow, todoUp, progressUp, completeUp, handleSorting, showError, checkLoginState};
  }
};
</script>

<style scoped>
.card-header{
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: fit-content;
    margin: 0px auto;
}
.arrows{
  display: flex;
  padding-left: 10px;
  align-items: center;
}
.arrows img{
  width: 20px;
  margin: 0px 3px;
  height: 20px;
}
.ml-12{
  margin-left: 15px;
}
.searchBar{
  margin: 20px 0px;
}
.searchBar input{
  padding: 10px 18px;
  margin-right: 15px;
}   
.column ul li p{
      width: 70%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.column ul li p img{
  margin: 0px 5px;
}
.column ul li img:hover{
  transform: scale(1.2);
  transition: all 0.1s ease-in;
}
.btn{
      padding: 8px 12px;
    background: crimson;
    border-radius: 12px;
    color: white;
    font-size: 23px;
    cursor: pointer;
}
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.container {
    display: flex;
    justify-content: space-around;
}

.column {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 30%;
}

.column h2 {
    text-align: center;
    color: #333;
}

.column ul {
    list-style-type: none;
    padding: 0;
}

.column ul li {
    background: #e3e3e3;
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.column ul li img{
   /* width: 30px; */
  cursor: pointer
}
.left-arrow, .right-arrow{
  width: 30px;
}
.column ul li:hover {
    background: #d3d3d3;
}

.imgs img{
  cursor: pointer;
}
.imgs{
  display: flex;
  align-items: center;
}
.color-red{
  color: red;
}
.color-black{
  color: black;
}
.li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 22px;
  font-weight: 600;
  background-color: rgb(202, 117, 134);
  color: white;
  list-style: none;
  margin: 10px 0px;

}
textarea{
    width: 100%;
    height: 100px; /* Fixed height */
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: none; /* Prevents resizing */
    box-sizing: border-box;
}
.input-section{
  display: flex;
  flex-direction: column;
  
}
#new-task{
  margin: 10px 0px;
  width: 100%;
  padding: 10px;
  
   
}
.addTask{
      padding: 8px 48px;
    color: white;
    background-color: crimson;
    border-radius: 8px;
    font-weight: bolder;
     font-size: 22px;
}
.addTask:hover{
  filter: brightness(1.05);
}
.addTask:disabled{
  background-color: rgb(241, 124, 148);
}
</style>