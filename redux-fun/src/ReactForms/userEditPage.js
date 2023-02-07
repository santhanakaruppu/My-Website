import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userDetails from "./userDetails";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditUser } from "../graphql/userMutation";
import { getUsers, getUser } from "../graphql/usersQuery";
import { useMutation, useQuery } from "@apollo/client";

const UserEditForm = () => {
  const { id } = useParams();
  //const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  console.log(user);
  const [getValue, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cpass: "",
  });

  let defaultsUser = {
    name: "",
    email: "",
    password: "",
    cpass: "",
  };

  defaultsUser = {
    name: user.name,
    email: user.email,
    password: user.password,
    cpass: user.password,
  };

  useEffect(() => {
    setValue(defaultsUser);
  }, []);

  const name = getValue.name;
  const email = getValue.email;
  const password = getValue.password;

  const [UpdateUser] = new useMutation(EditUser, {
    variables: { id, name, email, password },
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
        UpdateUser(id, getValue.name, getValue.email, getValue.password);
        console.log(userDetails);
        showSuccessMessage();
        //UserTable({ userData: userDetails });

        clearUser();
        window.location.replace("/");
      } else {
        showErrorMessage({ message: "Password not matched!" });
      }
    } else {
      showErrorMessage({ message: "Email not Valid!" });
    }
  };

  const showSuccessMessage = () => {
    toast.success("User Updated successfully !", {
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
      <h1>User Edit </h1>
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
    </div>
  );
};

export default UserEditForm;
