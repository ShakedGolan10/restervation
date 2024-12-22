import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get<T>(endpoint: string, params?: any, query?: object) {
        return ajax<T>(endpoint, 'GET', params, query)
    },
    post<T>(endpoint: string, data: any) {
        return ajax<T>(endpoint, 'POST', data)
    },
    put<T>(endpoint: string, data: any) {
        return ajax<T>(endpoint, 'PUT', data)
    },
    delete<T>(endpoint: string, data: any) {
        return ajax<T>(endpoint, 'DELETE', data)
    }
}

async function ajax<T>(endpoint: string, method = 'GET', data = null, query?: object):Promise<T> {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}${((method === 'GET' || method === 'DELETE') && data) ? `/${data}` : ''}`,
            method,
            data,
            params: (method === 'GET' && query) ? query : null
        })
        return res.data 
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}