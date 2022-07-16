import {useEffect, useState} from "react";

class _UserService{
    getUser(){
        return JSON.parse(localStorage.getItem('user'))
    }
    setUser(user) {
        try {
            localStorage.setItem('user', JSON.stringify(user))
        }catch (e){
            console.error("could not change user: \n" + e.toString())
        }
    }
    getAuthentication(){
        return JSON.parse(localStorage.getItem('auth'))
    }
    setAuthentication(auth){
        try {
            localStorage.setItem('auth', JSON.stringify(auth))
        }catch (e) {
            console.error("could not set authentication: \n" + e.toString())
        }
    }
    deleteUser(){
        localStorage.removeItem('user')
        localStorage.removeItem('auth')
    }
}

export const UserService = new _UserService()

export const useUser = () => {
    const [_user, setUser] = useState()
    const user = () => {
        const currentUser = UserService.getUser()
        const currentAuth = UserService.getAuthentication()
        if(!currentUser || !currentAuth){
            return
        }
        const newUser = {
            username: currentUser.username,
            token: currentAuth.token,
            roles: currentAuth.roles
        }
        if(newUser.username!==_user?.username) {
            setUser(newUser)
            return newUser
        }else {
            return _user
        }
    }
    useEffect(() => {
        try{
            user()
        }catch (e){
            console.info("no user logged in")
            setUser(undefined)
        }
    }, [_user, user])
    const changeUser = (user, auth) => {
        if(user===undefined && auth===undefined){
            UserService.deleteUser()
            setUser(undefined)
            return
        }
        if(_user) {
            UserService.deleteUser()
        }
        if(auth) {
            UserService.setAuthentication(auth)
            UserService.setUser({username: user.username})
            setUser({username: user.username, token: auth?.token, roles: auth?.roles})
        }else {
            UserService.setUser({username: user.username})
            setUser({username: user.username, token: "undefined", roles: "undefined"})
        }

    }

    return [user, changeUser]
}