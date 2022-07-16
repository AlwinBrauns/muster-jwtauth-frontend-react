import './Dashboard.scss'
import {useContext, useEffect, useState} from "react";
import UserContext from "../../user/UserContext";
import {BackendService} from "../../services/backend.service";
export default function Dashboard(props){
    const {user} = useContext(UserContext)
    const [allUsers, setAllUsers] = useState([])

    useEffect(()=>{
        if(user.roles.includes("ROLE_ADMIN") && allUsers.length === 0){
            BackendService.getAllUsers().then( users => {
                if(users)
                    setAllUsers(users)
            })
        }
    }, [allUsers])

    return (
        <div className="Dashboard">
            <h2>Hello {user.username.charAt(0).toUpperCase()+user.username.slice(1).toLowerCase()}</h2>
            <h1>Your Dashboard</h1>
            <hr />
            {allUsers.length?<div className="all-members">
                <h2>Users</h2>
                <ul>
                    {allUsers.map((aUser, index) => (<li key={index}>{aUser.username}</li>))}
                </ul>
            </div>:null}
        </div>
    )
}
