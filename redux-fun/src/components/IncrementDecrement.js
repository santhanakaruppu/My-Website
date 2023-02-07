import Button from 'react-bootstrap/Button';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
// import {actions} from '../store/index';
import { IncDecActions } from '../store/IncDec';

const IncrementDecrement=()=>{
  const counter=useSelector((state)=>state.IncDec.counter);
  // console.log(counter);
  const dispatch=useDispatch();
  const increment=()=>{
    // dispatch({type:"INC"});
    dispatch(IncDecActions.increment());
  }

  const decrement=()=>{
    // dispatch({type:"DEC"});
    dispatch(IncDecActions.decrement());
  }

  return (
    <div className="container">
     <h1>Redux Increment Decrement</h1>
     <div className="counter">
     <Button variant="primary" onClick={()=>increment()}>Increment</Button>{' '}
     <h2>{counter}</h2>
     <Button variant="secondary" onClick={()=>decrement()}>Decrement</Button>
    </div>
    </div>

  )}

  export default IncrementDecrement;