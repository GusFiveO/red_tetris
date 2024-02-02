import { getGoogleUrl } from "../utils/getGoogleUrl"
import { useLocation } from 'react-router-dom'
import { ReactNode } from "react"

type Props = {
    children: string | ReactNode
}

export const GoogleOAuthButton = ({children } : Props) => {
    const location = useLocation();
    let from = ((location.state as any)?.from?.pathname as string) || '/';
    return (
        <>
            <a href={getGoogleUrl(from)}>{children}</a>
            <div>lol</div>
        </>
    )
}