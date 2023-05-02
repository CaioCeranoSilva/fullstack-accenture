import axios, { AxiosResponse, AxiosError } from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 15000,
    headers: {},
})

export async function makeRequest(url = '/', method = 'get', baseURL,) {

    return new Promise((resolve, reject) => {
        axiosInstance({
            method: method,
            url: url,
            baseURL,
        })
            .then((response) => {
                // console.log("makeRequest response: ", response)
                resolve(response)
            })
            .catch((error) => {
                // console.log("makeRequest error: ", error)

                reject(error)
            })
    })

}

export async function getCep(cep = '/', method = 'get', baseURL,) {
    return new Promise((resolve, reject) => {
        axios.get('http://cep.la/' + cep, {
            headers: 'Accept: text/plain'
        })
            .then((response) => {
                console.log("makeRequest response: ", response)
                resolve(response)
            })
            .catch((error) => {
                console.log("makeRequest error: ", error)
                reject(error)
            })
    })
}
