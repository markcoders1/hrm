import { useState } from "react"
import axios from "axios";

export const ForgotPassword=()=>{
    
    const [email,setEmail]=useState("")

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const handlePassword=async ()=>{
        console.log(apiUrl)
        const response= await axios({
            method:"post",
            url:`${apiUrl}/api/reset-password`,
            data:{"email":email}
        })
        console.log(response)
    }

    return <>
        <h1 className="sign-heading">Get New Password</h1>
        <form>
            <div className="input-row">
                <div className="custom-input">
                    <label htmlFor="email">
                        Username or Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="login-btn">
                <input type="button" onClick={handlePassword} value="Get New Password!" />
            </div>
        </form>
    </>
}