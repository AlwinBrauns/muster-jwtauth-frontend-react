import './Login.scss'
import {useContext, useEffect, useState} from "react";
import UserContext from "../../user/UserContext";
import { Formik } from "formik";
import {AuthService} from "../../services/auth.service";
import {useNavigate} from "react-router-dom";
import BasicAlert from "../../components/BasicAlert/BasicAlert";

export default function Login(props){
    const {user, changeUser} = useContext(UserContext)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const LoginForm = ({values, handleSubmit, handleChange, isSubmitting}) => {
        return (
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={values.username} name={"username"} type="text" placeholder={"username"}/>
                <input onChange={handleChange} value={values.password} name={"password"} type="password" placeholder={"password"}/>
                <input type="submit" value="Log In" disabled={isSubmitting}/>
            </form>
        )
    }
    const onSubmit = (values, { setSubmitting }) => {
        const newUser = {
            username: values.username,
            password: values.password
        }
        AuthService.login(newUser).then(auth=>{
            if(!auth.token){
                setError("No valid credentials, try again")
                return
            }
            changeUser(newUser, auth)
        }).catch((error)=>{
            setError(error.toString())
        }).finally(()=>{
            setSubmitting(false)
        })
    }
    useEffect(()=>{
        if(user){
            navigate("/dashboard", {replace: true})
        }
    },[user, navigate])

    return (
        <div className="Login">
            <BasicAlert message={error}/>
            <h2>Log In</h2>
            <Formik
                initialValues={{username: '', password: ''}}

                onSubmit={onSubmit}
            >
                {
                    ({
                        values,
                        handleSubmit,
                        handleChange,
                        isSubmitting
                    }) => (
                        <LoginForm
                            values={values}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            isSubmitting={isSubmitting}
                        />
                    )
                }
            </Formik>
        </div>
    )
}
