const validators = (value) => {
    const emailPattern= new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$/);
    const namePattern = new RegExp(/^[a-zA-Z]+[a-zA-Z ]+$/);
    const passwordPattern = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/);
    const errors = {};
    if (!value.name) {
      errors.name = 'Required';
    }
    else if(!namePattern.test(value.name)) {
      errors.name = 'Invalid Name';
    }
    if (!value.email) {
      errors.email = 'Required';
    }
      else if(!emailPattern.test(value.email)) {
        errors.email = 'Invalid email address';
    }
    if (!value.password) {
      errors.password = 'Required';
    }else if(!passwordPattern.test(value.password)) {
      errors.password = 'Invalid password';
    }
    if (!value.confirmPassword) {
      errors.confirmPassword = 'Required';
    }else if(!passwordPattern.test(value.confirmPassword)) {
      errors.confirmPassword = 'Password and Confirm Password are Not Matched';
    }
    
    else if (value.password!== value.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
  }
  
  export default validators;