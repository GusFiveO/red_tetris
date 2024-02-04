import axios from 'axios'
import { ReactNode } from 'react'

type Props = {
    children: string | ReactNode
}

const getMyInfo = async () => {
	const response = await axios.get(import.meta.env.VITE_API_URL + '/player/me', {withCredentials: true})
	console.log(response)
}

export const PlayerInfoButton = ({children} : Props) => {
	return (
		<>
			<button onClick={getMyInfo}>{children}</button>
		</>
	)	
}