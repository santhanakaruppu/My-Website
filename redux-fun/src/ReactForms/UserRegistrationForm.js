import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userDetails from "./userDetails";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTable from "../ReduxForm/UserTable";
import { addUser } from "../graphql/userMutation";
import { getUsers } from "../graphql/usersQuery";
import { useMutation } from "@apollo/client";

const UserRegistrationForm = () => {
  const [getValue, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cpass: "",
  });
  // const [name,setName]=useState('');
  // const [email,setEmail] = useState('');
  // const [password,setPassword] = useState('');
  // const [cpassword, setcpassword]= useState('');

  const name = getValue.name;
  const email = getValue.email;
  const password = getValue.password;

  const [addNewUser] = new useMutation(addUser, {
    variables: { name, email, password },
    refetchQueries: [{ query: getUsers }],
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var emailPattern = new RegExp(
      "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
    );
    if (emailPattern.test(getValue.email)) {
      if (getValue.password === getValue.cpass) {
        userDetails.push(getValue);
        addNewUser(getValue.name, getValue.email, getValue.password);
        console.log(userDetails);
        showSuccessMessage();
        //UserTable({ userData: userDetails });
        clearUser();
      } else {
        showErrorMessage({ message: "Password not matched!" });
      }
    } else {
      showErrorMessage({ message: "Email not Valid!" });
    }
  };

  const showSuccessMessage = () => {
    toast.success("User added successfully !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showErrorMessage = ({ message }) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const clearUser = () => {
    const defaultsUser = {
      name: "",
      email: "",
      password: "",
      cpass: "",
    };
    setValue(defaultsUser);
  };

  return (
    <div className="container">
      <h1>User Registration </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              name="name"
              pattern="[a-zA-Z0-9]+[a-zA-Z0-9 ]+"
              value={getValue.name}
              required={true}
              onChange={handleChange}
              placeholder="Name"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              type="email"
              required={true}
              name="email"
              value={getValue.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              type="password"
              required={true}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              name="password"
              value={getValue.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            confirm Password
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              type="password"
              name="cpass"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required={true}
              value={getValue.cpass}
              onChange={handleChange}
              placeholder="confirm Password"
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>{" "}
        <Button onClick={clearUser} variant="secondary">
          Clear
        </Button>{" "}
        <ToastContainer />
      </Form>
      <div>
        <UserTable />
      </div>
    </div>
  );
};

export default UserRegistrationForm;
