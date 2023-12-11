import { useContext } from 'react';
import '../../../public/styles/login.css'
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

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
        <div className="login-container">
            <div className="login-form">
                <div className="avatar">
                    <img src="images/hero.png" alt="Login Image" className="login-image" />
                </div>
                <h2>SIGN IN</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name={LoginFormKeys.Email}
                            placeholder="📧 Email Address"
                            onChange={onChange}
                            value={ values.Email}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            name={LoginFormKeys.Password}
                            placeholder="🔑 Password"
                            onChange={onChange}
                            value={values.Password} />
                    </div>
                    <div className="input-group">
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
                <div className="sign-up-text">
                    Don't have an account? <a href="/">Sign Up</a>
                </div>
            </div>
        </div>
    );
}