import {useLocation} from "react-router-dom"

export const PageNotFound = () => {

	const location = useLocation()
	return (
		<h3>
			No match for {location.pathname}
		</h3>	
	)
}