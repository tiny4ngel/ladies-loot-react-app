import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import usePersistedState from "../hooks/usePersistedState";

import * as authService from '../services/authService';
import { getMyBillingInfo } from '../services/billingService';
import Path from "../paths";
import { toast } from 'react-hot-toast';


const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';


export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});


    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.login(values.email, values.password);

            if (result.accessToken) {
                toast.success('Successfully logged in!');
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('userId', result._id);
                setAuth({ ...result, userId: result._id, isAuthenticated: true });

                try {
                    const billingInfo = await getMyBillingInfo(result._id);
                    if (billingInfo) {
                        localStorage.setItem('billInfoId', billingInfo._id);
                    }
                } catch (error) {
                    console.error('Error fetching billing information:', error);
                }

                navigate(Path.Home);
            } else {
                if (result.code === 403) {
                    toast.error('Login or password don\'t match. Please try again.');
                } else {
                    toast.error('Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);

            if (error.code === 403) {
                toast.error('Login or password don\'t match. Please try again.');
            } else {
                toast.error('An error occurred during login');
            }
        }
    };


    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password);

        if (result.accessToken) {
            toast.success('Successfully registered')
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('userId', result._id);
            setAuth({ ...result, userId: result._id, isAuthenticated: true });
            navigate(Path.Home);
        } else {
            console.error('Registration failed');
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('billInfoId');
        setAuth({ accessToken: null, userId: null, isAuthenticated: false, billInfoId: null });
        navigate(Path.Home);

    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        ...auth,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;