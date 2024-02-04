import axios from "axios"

export const getAccessToken = async (api_url: string, code: string | null) => {
    const option = {
        withCredentials: true,
        headers: {
            'Authorization': code
        }
    }
    // try {
    //     console.log(api_url)
    //     const response = await axios.post(api_url, {}, option) 
    //     console.log(response)
    //     return response
    // } catch (error) {
    //     console.error(error)
    // }
    const response = await axios.post(api_url, {}, option) 
    return response
}