import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import IncrementDecrement from "./components/IncrementDecrement.js";
import HomePage from "./components/HomePage";
import NavBar from "./NavBar";
import ToDoList from "./components/ToDoList";
import UserRegistrationForm from "./ReactForms/UserRegistrationForm";
import FormCode from "./ReduxForm/RegisterForm";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import UserEditForm from "./ReactForms/userEditPage";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query getUsers {
//         users {
//           id
//           name
//           email
//           todolist {
//             id
//             description
//             isCompleted
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result.data));

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <div className="NavBar">
              <NavBar />
            </div>

            <div>
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/incdec" element={<IncrementDecrement />}></Route>
                <Route path="/todo" element={<ToDoList />}></Route>
                <Route
                  path="/register"
                  element={<UserRegistrationForm />}
                ></Route>
                <Route path="/reduxform" element={<FormCode />}></Route>
                <Route path="/edituser/:id" element={<UserEditForm />}></Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
