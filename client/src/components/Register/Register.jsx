import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const RegisterFormKeys = {
    Email: 'email',
    Username: 'email',
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
    });

    return (
        <div class="login-container">
            <div class="login-form">
                <div class="avatar">
                    <img src="images/hero.png" alt="Login Image" class="login-image" />
                </div>
                <h2>SIGN UP</h2>
                <form onSubmit={onSubmit}>
                    <div class="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="📧 Email Address"
                            onChange={onChange}
                            values={values[RegisterFormKeys.Email]}
                        />
                    </div>
                    <div class="input-group">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            onChange={onChange}
                            values={values[RegisterFormKeys.Username]}
                        />
                    </div>
                    <div class="input-group">
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
                    <div class="input-group">
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
                <div class="sign-up-text">
                    Already have an account? <a href="/">Sign In</a>
                </div>
            </div>
        </div>
    );
}


