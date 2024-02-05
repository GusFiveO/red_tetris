import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAccessToken } from "../utils/getAccessToken"


export const Redirect = () => {
    const [searchParams] = useSearchParams()
    const [error, setError] = useState<Boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const code = searchParams.get("code")
        console.log(code)
        getAccessToken(`${import.meta.env.VITE_API_URL}/auth`, code)
        .then(
            (data) => {
                console.log("SUCCES:", data)
                navigate("/")
            })
        .catch((error) => {
            console.log("ERROR:", error)
            setError(true)
        })
    }, [])

    return (
        <>
        {
            error ?
            <h1>ERROR</h1>
            :
            <h1>Loading...</h1>

        }
        </>
    )
}