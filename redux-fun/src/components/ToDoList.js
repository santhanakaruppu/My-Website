import Button from "react-bootstrap/Button";
import { useState } from "react";
import WelcomeToDo from "./WelcomeToDo";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../store/ToDo";

const ToDoList = () => {
  const [todoVal, setTodoVal] = useState({
    todo: "",
  });

  const EditList = useSelector((state) => state.todo.EditList);
  console.log(EditList[0], 55);
  const dispatch = useDispatch();
  const todolist = useSelector((state) => state.todo.todoList);

  const isAddList = useSelector((state) => state.todo.isAddList);
  const completedList = useSelector((state) => state.todo.completedList);

  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodoVal((values) => ({ ...values, [name]: value }));
  };
  const editTodo = (todoId) => {
    console.log(todoId);
    console.log(todolist);
    const EditObj = todolist.find((data) => data.id === todoId);
    console.log(EditObj);

    setTodoVal(EditObj);
    console.log(todoVal.todo);
    dispatch(todoAction.AddEditList(EditObj));
    console.log(EditList[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(EditList, 88);
    let date = Date.now();
    let todoObj = {};
    console.log(EditList);
    todoObj = {
      id: date,
      todo: todoVal.todo,
      completed: false,
    };
    console.log(EditList, 88);
    if (EditList[0]) {
      console.log(EditList[0].id);
      todoObj = {
        id: EditList[0].id,
        todo: todoVal.todo,
        completed: false,
      };
    }

    dispatch(todoAction.addTodoList(todoObj));

    let clearTodo = { todo: "" };
    setTodoVal(clearTodo);
  };

  const deleteTodo = (todoId) => {
    console.log(todoId);
    dispatch(todoAction.deleteTodoList(todoId));
  };

  const completeToDo = (todoId) => {
    console.log(todoId);
    dispatch(todoAction.AddCompletedList(todoId));
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={HandleChange}
            value={todoVal.todo}
            id="todo"
            name="todo"
          />

          <Button type="submit" variant="primary">
            Save
          </Button>
        </form>
      </div>
      {isAddList && <WelcomeToDo />}
      <div className="row">
        <div className="col">
          {!isAddList && <h3>In Progress</h3>}
          <table className="table">
            <tbody>
              {todolist.map(
                (todo) =>
                  !todo.completed && (
                    <tr key={todo.id}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onClick={() => completeToDo(todo.id)}
                          value=""
                          id={todo.id}
                        />
                      </td>
                      <td>{todo.todo}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => editTodo(todo.id)}
                        >
                          Edit
                        </Button>{" "}
                      </td>
                      <td>
                        <Button
                          onClick={() => deleteTodo(todo.id)}
                          variant="danger"
                        >
                          Delete
                        </Button>{" "}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <div className="col">
          {!completedList && (
            <div>
              <h3>completed</h3>
            </div>
          )}
          <table className="table">
            <tbody>
              {todolist.map(
                (todo) =>
                  todo.completed && (
                    <tr key={todo.id}>
                      <td>
                        <input
                          className="form-check-input"
                          onClick={() => completeToDo(todo.id)}
                          type="checkbox"
                          defaultChecked={true}
                          id={todo.id}
                        />
                      </td>
                      <td>{todo.todo}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
