import {createSlice} from '@reduxjs/toolkit';

const todo=createSlice({
    name:'Todo',
    initialState:{
        todoList:[],
        isAddList:true,
        isCompleteList:false,
        completedList:[],
        EditList:[],
    },
    reducers:{
        addTodoList(state,action){
            const newList=action.payload;
            // console.log(newList,66);
            console.log(state.todoList);
            let index=state.todoList.findIndex((editTodo)=>editTodo.id===newList.id);
            console.log(index,777);
            if(index==-1){
                state.todoList.push(newList);

            }
            if(index>=0){
               // console.log(state.todoList.
                state.todoList[index].todo=newList.todo;
                state.EditList.pop();
                

            }
            index=-1;
        
            console.log(newList.todo,index);
           
            
            if(state.todoList.length > 0 ){
                state.isAddList=false;
            }
        },

        AddEditList(state, action){
            const newList=action.payload;
            console.log(newList);
            state.EditList.pop();
            state.EditList.push(newList);
        },

        editTodoList(state,action){
            const todoId=action.payload;
            const editTodo=state.todoList.find(data=>data.id===todoId);
            
        },

        deleteTodoList(state,action){
                    const todoId=action.payload;
                    console.log(todoId);
                    const index=state.todoList.findIndex((editTodo)=>editTodo.id===todoId);
                    console.log(index);
                    state.todoList.splice(index,1);


       
        },

        AddCompletedList(state,action){
            const todoId=action.payload;
            console.log(todoId);
            const index=state.todoList.findIndex((editTodo)=>editTodo.id===todoId);
            state.todoList[index].completed=!state.todoList[index].completed;
            console.log(state.todoList[index].completed);
            //state.completedList=false;
            if(!state.todoList.find(todo=>todo.completed===true)){
                state.completedList=true;
            }else{
                state.completedList=false;
            }
            
            
        },
}})

export const todoAction = todo.actions;

export default todo;