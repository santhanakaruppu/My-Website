import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import UserTable from "./UserTable.js";
import userDetails from "./userDetails";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import validators from "./Validators.js";
import { useMutation, useQuery } from "@apollo/client";
import { addUser } from "../graphql/userMutation.js";
import { getUsers } from "../graphql/usersQuery.js";

let name = "";
let email = "";
let password = "";

// const [addNewUser] = new useMutation(addUser, {
//   variables: { name, email, password },
//   refetchQueries: [{ query: getUsers }],
// });

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          {label}
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            {...input}
            placeholder={label}
            type={type}
            onChange={input.onChange}
            value={input.value}
            className="form-control"
          />
          {touched &&
            ((error && <span className="text-danger">{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </Col>
      </Form.Group>
    </div>
  );
};

const onSubmit = (values) => {
  // userDetails.push(values);
  console.log(values.name);
  // addNewUser(values.name, values.email, values.password);
  // console.log(userDetails);
};

let RegisterForm = (props) => {
  const { handleSubmit, reset, submitting, pristine } = props;
  return (
    <div className="container">
      <div className="form-group-mb-3">
        <Field
          name="name"
          component={renderField}
          type="text"
          allowPattern=""
          label="First Name"
        />
      </div>
      <div className="form-group">
        <Field
          name="email"
          component={renderField}
          type=" email"
          label="Email"
        />
      </div>
      <div className="form-group">
        <Field
          name="password"
          component={renderField}
          type="password"
          label="Password"
        />
      </div>
      <div className="form-group">
        <Field
          name="confirmPassword"
          component={renderField}
          type="password"
          label="Confirm Password"
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={pristine || submitting}
          onClick={handleSubmit(onSubmit)}
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          type="clear"
          disabled={pristine || submitting}
          onClick={reset}
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>

      <div>
        <UserTable />
      </div>
    </div>
  );
};

const afterSubmit = (result, dispatch) => dispatch(reset("userDetails"));

RegisterForm = reduxForm({
  // a unique name for the form
  form: "userDetails",
  validate: validators,
  onSubmitSuccess: afterSubmit,
})(RegisterForm);

export default RegisterForm;
