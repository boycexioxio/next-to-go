import axios from 'axios'

axios.defaults.baseURL = `${import.meta.env.VITE_API_HOST}/rest/v1`

/**
 * Resolve response body
 */
axios.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response) {
      const { data, statusText } = err.response
      const message = data.error || data.message || statusText

      return Promise.reject(new Error(message))
    }

    return Promise.reject(err)
  }
)

export default axios
