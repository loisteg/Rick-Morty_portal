import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"


const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '15px'}}>Page doesn't exist</p>
            <Link to="/" style={{'display': 'block', 'marginTop': '40px', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013' }}>Back to main page</Link>
        </div>
    )
}

export default Page404;