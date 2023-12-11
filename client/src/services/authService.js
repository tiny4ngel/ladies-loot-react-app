import * as request from '../lib/request.js'


export const login = async (email, password) => {
    const result = await request.post(`users/login/`, {
        email,
        password,
    });

    return result;
}