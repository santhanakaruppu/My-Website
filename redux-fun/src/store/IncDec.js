import {createSlice} from '@reduxjs/toolkit';

const IncDec= createSlice({
    name:"counter",
    initialState:{counter:0},
    reducers:{
        increment(state, action){
            state.counter++;
        },
        decrement(state, action){
            state.counter--;
        }
    }
});
export const IncDecActions = IncDec.actions;

export default IncDec;