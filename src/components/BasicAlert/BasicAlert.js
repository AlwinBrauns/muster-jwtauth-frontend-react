import './BasicAlert.scss'
import {useEffect, useState} from "react";
export default function BasicAlert(props){
    const [message, setMessage] = useState("")
    const reset = async () => {

    }
    useEffect( ()=>{
        setMessage(props.message)

    },[props.message])
    return (
        <div className="BasicAlert">
            <p>{message}</p>
        </div>
    )
}
