import axios from "axios";
import {API_URL} from "./service.consts";
import {UserService} from "../user/useUser";



class _BackendService {
    _allUsers = []
    getAllUsers(){
        if(!this._allUsers.length) {
            return axios.get(API_URL + "users/all", {
                headers: {
                    Authorization: "Bearer " + UserService.getAuthentication().token
                }
            }).then(
                ({data}) => {
                    this._allUsers = data
                    return this._allUsers
                }
            )
        }else {
            //if already loaded, don't load again from Backend
            return Promise.resolve(this._allUsers)
        }
    }
}

export const BackendService = new _BackendService()