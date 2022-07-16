import axios from "axios";
import {API_URL} from "./service.consts";
class _AuthService {
    login(user){
        return axios.post(API_URL + "auth/signin", user).then(response => {
            const auth = {
                token: response.data.token,
                roles: response.data.roles
            }
            return auth
        })
    }
    register(user){
        return axios.post(API_URL + "auth/signup", {
            username: user.username,
            password: user.password,
            roles: ["user"]
        })
    }
}

export const AuthService = new _AuthService()