import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"

const getAccessToken = async (api_url: string, code: string | null) => {
    const option = {
        withCredentials: true,
        headers: {
            'Authorization': code
        }
    }
    try {
        console.log(api_url)
        const response = await axios.post(api_url, {}, option) 
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const Redirect = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    // console.log(searchParams)

    useEffect(() => {
        const code = searchParams.get("code")
        console.log(code)
        getAccessToken(`${import.meta.env.VITE_API_URL}/auth`, code)
        .then(
            (data) => {
                console.log(data)
            })
    }, [])

    return (
        <>
            <h1>Loading...</h1>
        </>
    )
}