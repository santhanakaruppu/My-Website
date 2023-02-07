import React from 'react';
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import userDetails from './userDetails';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserTable from './UserTable.js';
import { Field, reduxForm } from 'redux-form';

const user=[];

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
  const onSubmit = values =>{
    user.push(values);
    //userDetails.push(values);
    //console.log(JSON.stringify(values));
    console.log(user);
    console.log(userDetails);
    //alert(JSON.stringify(values));
}
    
    

let FormCode = props => {
  const { handleSubmit} = props;
  return (
    <div>
    <form onSubmit={ handleSubmit() }>
      <div className="form-group-mb-3">
        <Field name="name" component={renderField} type="text" label="First Name" />
      </div>
      <div className="form-group">
        <Field name="email" component={renderField} type=" email" label="Email" />
      </div>
      <div className="form-group">
        <Field name="password" component={renderField} type="password" label="Password" />
      </div>
      <div className="form-group">
        <Field name="confirmPassword" component={renderField} type="password" label="Confirm Password" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
    <div>
      <UserTable userData={user}/>
    </div>
    </div>
  )
}
FormCode = reduxForm({
  form: 'contact',
  onSubmit,
})(FormCode);

export default FormCode;