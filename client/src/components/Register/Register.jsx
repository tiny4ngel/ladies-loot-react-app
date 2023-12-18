import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import { validateRegistration } from "../../utils/validationPatterns";
import Path from '../../paths';
import { Link } from 'react-router-dom';

import styles from './Register.module.css';


const RegisterFormKeys = {
    Email: 'email',
    Username: 'username',
    Password: 'password',
    ConfirmPassword: 'confirm-password',
};

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    }, validateRegistration);

    return (
        <div class={styles.registerContainer}>
            <div class={styles.registerForm}>
                <div class="avatar">
                    <img src="images/hero.png" alt="Login Image" class="login-image" />
                </div>
                <h2>SIGN UP</h2>
                <form onSubmit={onSubmit}>
                    <div class={styles.inputGroup}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="📧 Email Address"
                            onChange={onChange}
                            values={values[RegisterFormKeys.Email]}
                        />
                    </div>
                    <div class={styles.inputGroup}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            onChange={onChange}
                            values={values[RegisterFormKeys.Username]}
                        />
                    </div>
                    <div class={styles.inputGroup}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="🔑 Password"
                            onChange={onChange}
                            values={values[RegisterFormKeys.Password]}
                        />
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="🔑 Confrirm Password"
                            onChange={onChange}
                            values={values[RegisterFormKeys.ConfirmPassword]}
                        />
                    </div>
                    <div class={styles.inputGroup}>
                        <button type="submit">Sign up</button>
                    </div>
                </form>
                <div class="sign-up-text">
                    Already have an account? <Link to={Path.Login}>Sign In</Link>
                </div>
            </div>
        </div>
    );
}

