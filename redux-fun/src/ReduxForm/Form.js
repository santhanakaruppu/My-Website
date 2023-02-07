import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userDetails from "./userDetails";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTable from "./UserTable.js";
import { reduxForm, Field } from "redux-form";
// import NavBar from '../NavBar.js'

const Forms = () => {
  const [getValue, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cpass: "",
  });

  // const [user, setUser]=useState([])

  useEffect(() => {
    UserTable({ userData: userDetails });
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((values) => ({ ...values, [name]: value }));
    // console.log(getValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(getValue);
    // console.log(getValue);
    var emailPattern = new RegExp(
      "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
    );
    if (emailPattern.test(getValue.email)) {
      if (getValue.password === getValue.cpass) {
        userDetails.push(getValue);
        console.log(userDetails);
        showSuccessMessage();
        UserTable({ userData: userDetails });
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
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const showErrorMessage = ({ message }) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
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
      {/* <NavBar /> */}
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
        {userDetails.length > 0 && <UserTable userData={userDetails} />}
      </div>
    </div>
  );
};

export default Forms;
