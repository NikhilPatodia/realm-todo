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
        <!-- <div v-if="todoData"> 
        <ul v-for="todo in todoData" :key="todo._id" class="task-list" >
          <div class="li"> <div> <p ><span class="color-black">title: </span> {{ todo.title }} </p> <p><span class="color-black">desc: </span>{{ todo.desc }} </p></div> <div class="imgs"> </div> </div>
        </ul>
        </div> -->
        <div v-if="todoData" class="container">
        <div class="column" id="todo">
         
            <h2>To-Do</h2>

            <ul  v-for="todo in forTodo" :key="todo._id">
               <li v-if="todo.track === 'Todo'"><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Todo')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Todo')" src="../icons/delete.svg" alt=""></p><img @click="changeTask('right', 'Todo', todo._id, todo.title, todo.desc)" class="right-arrow" src="../icons/right.png" alt=""></li>
                
            </ul>
        </div>
        <div class="column" id="inprogress">
       
            <h2>In-Progress</h2>
             <ul  v-for="todo in forProgress" :key="todo._id">
               <li v-if="todo.track === 'Progress'"><img @click="changeTask('left', 'Progress', todo._id,todo.title, todo.desc)" class="left-arrow" src="../icons/left.png" alt=""><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Progress')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Progress')" src="../icons/delete.svg" alt=""></p><img @click="changeTask('right', 'Progress', todo._id,todo.title, todo.desc)" class="right-arrow" src="../icons/right.png" alt=""></li>
                
            </ul>
        </div>
        <div class="column" id="complete">
          
            <h2>Complete</h2>
             <ul  v-for="todo in forComplete" :key="todo._id">
               <li v-if="todo.track === 'Completed'"><img @click="changeTask('left', 'Completed', todo._id,todo.title, todo.desc)" class="left-arrow" src="../icons/left.png" alt=""><p>{{ todo.title }}<img @click="edit(todo.title, todo.desc, todo._id, 'Completed')" width="20px" src="../icons/edit.svg" alt=""> <img width="20px" @click="deleteId(todo._id, 'Completed')" src="../icons/delete.svg" alt=""></p></li>
                
            </ul>
        </div>
    </div>
    </div>
</template>
<script>

import {useAppState} from '../realmState.js'
import {onMounted, ref} from "vue"

export default {
  setup() {
    const title = ref("");
    const titleError = ref("")
    const desc = ref("");
    const type = ref("");
    const valid = ref(false);
    const todo_id = ref(null);
    const isProcessing = ref(false);
    const {addTodo, todoData, defaultData, editTodo, deleteTodo, changeTask, forTodo, forComplete, forProgress} = useAppState();
    onMounted(async()=>{
      await defaultData();
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

    return {  title, desc , addtodo, todoData, titleError, handleChange, edit, deleteId, changeTask, forTodo, forComplete, forProgress, isProcessing};
  }
};
</script>

<style scoped>

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
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.container {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
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