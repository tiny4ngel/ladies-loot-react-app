const baseUrl = 'http://localhost:3030/'

const buildOptions = (data) => {
    const options = {
        headers: {}
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    return options;
    
};

const request = async (method, url, data) => {
    const response = await fetch(baseUrl + url, {
        ...buildOptions(data),
        method,
    });

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if(response.ok && result.accessToken){
        localStorage.setItem('accessToken', result.accessToken);
    }
    else if (!response.ok) {
        if (response.status === 403) {
            localStorage.removeItem('accessToken');
        }
        throw result;
    }

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');