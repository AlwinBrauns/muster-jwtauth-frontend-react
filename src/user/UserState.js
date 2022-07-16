import {useUser} from "./useUser";
import UserContext from "./UserContext";

function UserState(props){
    const [user, changeUser] = useUser()
    return (
        <UserContext.Provider
            value={{
                user: user(),
                changeUser: changeUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState