import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { getAccessToken } from "../utils/getAccessToken"


export const Redirect = () => {
    const [searchParams] = useSearchParams()

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