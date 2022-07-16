import './Register.scss'
import BasicAlert from "../../components/BasicAlert/BasicAlert";
import {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import UserContext from "../../user/UserContext";
import {AuthService} from "../../services/auth.service";
import {useNavigate} from "react-router-dom";
export default function Register(props){
    const [error, setError] = useState("")
    const {user, changeUser} = useContext(UserContext)
    const navigate = useNavigate()
    const RegisterForm = ({values, handleSubmit, handleChange, isSubmitting}) => {
        return (
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={values.username}
                    name={"username"}
                    type="text"
                    placeholder="username"
                />
                <input
                    onChange={handleChange}
                    value={values.password}
                    name={"password"}
                    type="password"
                    placeholder="password"
                />
                <input
                    type="submit"
                    value="Register"
                    disabled={isSubmitting}
                />
            </form>
        )
    }
    const onSubmit = (values, {setSubmitting}) => {
        if(!values.username || !values.password) {
            setSubmitting(false)
            setError("Values needed!")
            return
        }
        const newUser = {
            username: values.username,
            password: values.password
        }
        AuthService.register(newUser).then(_=>{
            changeUser(newUser, undefined)
            navigate("/login", {replace: true})
        }).catch((error)=>{
            setError(error.toString())
        }).finally(()=>{
            setSubmitting(false)
        })
    }
    return (
        <div className="Register">
            <BasicAlert message={error} />
            <h2>Register</h2>
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
                        <RegisterForm
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
