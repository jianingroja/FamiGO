import { useState } from 'react';
import { User } from '../../types/user';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import useAuth from '../../hooks/useAuth';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  interface FormState {
    inputValues: User;
  }

  const [inputValues, setInputValues] = useState<FormState['inputValues']>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const hasAllInputs = Object.values(inputValues).every(
    (input) => Boolean(input) === true
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasAllInputs) {
      toast.error('Please fill in all inputs', { icon: '🤖' });
      return;
    }

    if (inputValues.password != inputValues.confirmPassword) {
      toast.error('Passwords are different', { icon: '🤖' });
      return;
    }

    const { confirmPassword, ...info } = inputValues;
    const registerPromise = handleRegister(info);

    await toast.promise(
      registerPromise,
      {
        loading: 'Registering...',
        success: 'Welcome on board',
        error: (error) => `${error.toString().split(': ')[1]}`,
      },
      {
        success: {
          icon: '☀️',
        },
        error: {
          icon: '🤖',
        },
      }
    );

    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="create-account">
        <h2>Create account</h2>
      </div>
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
      <div className="signin-section">
        <span>Already have an account?</span>
        <Link to="/login" className="signin-btn">
          LOG IN
        </Link>
      </div>
    </div>
  );
};
export default Register;
