import { useState } from 'react';
import { User } from '../../types/user';
import { Link, useNavigate } from 'react-router-dom';
import { registerPOST } from '../../services/auth';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  interface FormState {
    inputValues: User;
  }

  const [inputValues, setInputValues] = useState<FormState['inputValues']>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValues.password != inputValues.confirmPassword) {
      console.log('Password is different than Confirm Password');
    } else {
      registerPOST(
        inputValues.username,
        inputValues.email,
        inputValues.password
      ).then(() => {
        setInputValues({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        navigate('/login');
      });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required={true}
          placeholder="Name"
          value={inputValues.username}
          onChange={handleChange}
          name="username"
          className="auth"
        />

        <input
          type="email"
          required={true}
          placeholder="Email"
          value={inputValues.email}
          onChange={handleChange}
          name="email"
          className="auth"
        />

        <input
          type="password"
          required={true}
          placeholder="Password"
          value={inputValues.password}
          onChange={handleChange}
          name="password"
          className="auth"
        />

        <input
          type="password"
          required={true}
          placeholder="Confirm password"
          value={inputValues.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          className="auth"
        />
        <input type="submit" value="SIGN UP" className="login-btn" />
      </form>
      <div className="signup-section">
        <span>Don't have an account?</span>
        <Link to="/login" className="signup-btn">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};
export default Register;
