import axios from 'axios';
import React, { useState } from 'react';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const loginUser = async() => {
    try {
        /*
        First passing in encoded credentials and getting the token
        */
        let encodedString = window.btoa(username + ":" + password);
        const response = await axios.get("http://localhost:8080/api/user/getToken",{
            headers:{"Authorization": "Basic " + encodedString}
        })
        // console.log(response);
        let token = response.data;
        console.log(token);
        localStorage.setItem("token", token);
        /*
        Passing in the token and getting the details of the user specifically role
        */
       const details = await axios.get("http://localhost:8080/api/user/getLoggedInUserDetails",{
        headers:{"Authorization": "Bearer " + token}
       })
       console.log(details);
       const role = details.data.user.role;
       
       switch(role){
        case "CUSTOMER":
            console.log("CUSTOMER DASHBOARD");
            break;
        case "FLIGHTOWNER":
            console.log("FLIGHTOWNER DASHBOARD");
            break;
        case "MANAGER":
            console.log("MANAGER DASHBOARD");
            break;
        default:
            console.log("SOMETHING WENT WRONG");
       }
       setMsg("LOGIN SUCCESSFUL!!!!")
        
    } catch (error) {
        console.log(error);
        setMsg("Login Failed");
    }
    }
    return (
         <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <br /><br /><br /><br />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"> </div>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header"> Login</div>
                        <div className="card-body">
                            {msg !== "" ? <div>
                                <div className="alert alert-info" >
                                    {msg}
                                </div>
                            </div> : ""}

                            <div className="mb-2">
                                <label>Enter username:</label>
                                <input type="text" className="form-control"
                                    onChange={($e) => setUsername($e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label>Enter password:</label>
                                <input type="password" className="form-control"
                                    onChange={($e) => setPassword($e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <button className="btn btn-primary" onClick={() => loginUser()}>Login</button>
                            </div>
                        </div>
                        <div className="card-footer">
                            Don't have an Account? Sign Up here.
                        </div>
                    </div>
                </div>
                <div className="col-md-3"> </div>
            </div>
        </div>
    )
}

export default Login