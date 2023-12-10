import * as request from '../lib/request.js'

const baseUrl = 'users';

export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login/`, {
        email,
        password,
    });

    return result;
}