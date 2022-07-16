import './Home.scss'
import image from './imgs/jwt-logo.png'
export default function Home(props){
    return (
        <div className="Home">
            <h1>Login with JWT-Token</h1>
            <img src={image} alt="jwt-logo"/>
        </div>
    )
}
