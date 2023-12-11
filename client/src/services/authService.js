import * as request from '../lib/request.js'


export const login = async (email, password) => {
    const result = await request.post(`users/login/`, {
        email,
        password,
    });

    return result;
}

export const register = (email, password) => request.post('users/register',{
    email,
    password,
});

export const logout = () => request.get('users/logout')