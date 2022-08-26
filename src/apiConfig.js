import axios from "axios"

let axiosClient = axios.create({
    baseURL: "http://localhost:8000/",
})

axiosClient.interceptors.request.use(
    (requestConfig) => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN")
        if (accessToken) {
            requestConfig.headers["Authorization"] = "Bearer " + accessToken
        }
        return requestConfig
    }, (error) => {
        return Promise.reject(error)
    });
axiosClient.interceptors.response.use((res) => {
    return res
},
    async (err) => {
        const originalConfig = err.config;
        const statusCode = err.response.status;
        if (statusCode === 401 && originalConfig.url === "/auth/token") {
            return Promise.reject(err)
        }
        if (statusCode == 401) {
            const tokenResponse = await axiosClient.get("/auth/token", {
                token: localStorage.getItem("REFRESH_TOKEN")
            })

            localStorage.setItem("ACCESS_TOKEN", tokenResponse.data.accessToken)
            return axiosClient(originalConfig)
        }
        return Promise.reject(err)
    });
export default axiosClient