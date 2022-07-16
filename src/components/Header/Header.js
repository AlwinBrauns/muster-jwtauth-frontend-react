import './Header.scss'
import {MainRoutes} from "../../App";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import UserContext from "../../user/UserContext";

export default function Header(props){

    const {user, changeUser} = useContext(UserContext)
    const [hamburgerActivated, setHamburgerActivated] = useState(false)

    const NavLinks = ()=>{
        const routes = MainRoutes
        return (
            <>
            {
                Object.keys(routes).map((routeName)=> {
                        if(routeName==="dashboard" && !user) {
                            return null
                        }
                        if((routeName==="login" || routeName==="register") && user){
                            return null
                        }
                        return (
                            <li key={routeName}>
                                <Link to={MainRoutes[routeName].path}>{routeName.toUpperCase()}</Link>
                            </li>
                        )
                    }
                )
            }
            </>
        )
    }

    const toggleHamburger = () => {
        setHamburgerActivated(!hamburgerActivated)
    }

    return (
        <div className="Header">
            <div className="navigation">
                <nav>
                    <ul className={hamburgerActivated?"open":""} >
                        <NavLinks />
                        {user?<li onClick={_ => changeUser(undefined, undefined)}>
                            <Link to={MainRoutes.home.path}>LOGOUT</Link>
                        </li>:null}
                    </ul>
                    <span className={hamburgerActivated?"open":""} onClick={toggleHamburger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </nav>
                </div>
            <div className="space"></div>
        </div>
    )
}
