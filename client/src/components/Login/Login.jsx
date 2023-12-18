import { useContext } from 'react';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';
import Path from '../../paths';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';


const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    });


    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <div className="avatar">
                    <img src="images/hero.png" alt="Login Image" className="login-image" />
                </div>
                <h2>SIGN IN</h2>
                <form onSubmit={onSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            id="email"
                            name={LoginFormKeys.Email}
                            placeholder="📧 Email Address"
                            onChange={onChange}
                            value={values.Email}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            id="password"
                            name={LoginFormKeys.Password}
                            placeholder="🔑 Password"
                            onChange={onChange}
                            value={values.Password} />
                    </div>
                    <div className={styles.inputGroup}>
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
                <div className="sign-up-text">
                    Don't have an account? <Link to={Path.Register}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}